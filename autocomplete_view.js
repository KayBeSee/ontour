/*$AMPERSAND_VERSION*/
var View = require('ampersand-view');
var dom = require('ampersand-dom');
var matchesSelector = require('matches-selector');

var slice = Array.prototype.slice;

function getMatches(el, selector) {
    if (selector === '') return [el];
    var matches = [];
    if (matchesSelector(el, selector)) matches.push(el);
    return matches.concat(slice.call(el.querySelectorAll(selector)));
}


// Item View for Dropdown Menu of Autofilled Results
var ItemView = View.extend({
  autoRender: true,
  template: ['<a data-hook="id"><span data-hook="name"></span></a>'].join(''),
  bindings: {
    'model.id': {
      type: 'attribute',
      name: 'id',
      hook: 'id'
    },
    'model.name': '[data-hook=name]'
  },
  events: {
    'click': 'selectItem',
    'mouseover': 'activateItem'
  },
  initialize: function(options) {
    this.parent = options.parent;
  },
  selectItem: function() {
    this.parent.selectModel(this.model);
  },
  activateItem: function() {
    this.parent.activateModel(this.model);
  }
});



module.exports = View.extend({
    template: [
        '<div class="form-group">',
            '<span class="form-label" data-hook="label"></span>',
            '<input class="form-input btn-block" autocomplete="off">',
            '<ul class="dropdown-menu"></ul>',
            '<div data-hook="message-container" class="message message-below message-error">',
                '<p data-hook="message-text"></p>',
            '</div>',
        '</div>'
    ].join(''),
    bindings: {
        'name': {
            type: 'attribute',
            selector: 'input, textarea',
            name: 'name'
        },
        'label': [
            {
                hook: 'label'
            },
            {
                type: 'toggle',
                hook: 'label'
            }
        ],
        'message': {
            type: 'text',
            hook: 'message-text'
        },
        'showMessage': {
            type: 'toggle',
            hook: 'message-container'
        },
        'placeholder': {
            type: 'attribute',
            selector: 'input, textarea',
            name: 'placeholder'
        },
        'readonly': {
            type: 'booleanAttribute',
            name: 'readonly',
            selector: 'input, textarea'
        }
    },
    initialize: function (spec) {
      console.log(spec);
        spec || (spec = {});
        this.collection = spec.collection;
        this.tests = this.tests || spec.tests || [];
        this.on('change:type', this.handleTypeChange, this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChanged = this.handleInputChanged.bind(this);
        var value = !spec.value && spec.value !== 0 ? '' : spec.value;
        this.startingValue = value;
        this.inputValue = value;
        this.label = spec.label || this.name;
        this.parent = spec.parent || this.parent;
        this.itemTemplate = spec.itemTemplate;
        this.template = spec.template || this.template;
        this.placeholder = spec.placeholder;

        this.on('change:valid change:value', this.reportToParent, this);
        this.on('change:validityClass', this.validityClassChanged, this);
        if (spec.autoRender) this.autoRender = spec.autoRender;
        if (spec.template) this.template = spec.template;
        if (spec.beforeSubmit) this.beforeSubmit = spec.beforeSubmit;


        if (this.collection.isCollection) {
          this.idAttribute = spec.idAttribute || this.collection.mainIndex || '_id';
          this.textAttribute = spec.textAttribute || 'text';
          this.queryKey = spec.queryKey;
        }

        this.maxResults = spec.maxResults || 10;
        this.minKeywordLength = spec.minKeywordLength || 1;
        // Boolean toggles
        this.focused = false; // Is the input in focus?
        this.shown = false; // Is the menu shown?
        this.mousedover = false; // Is the mouse over the typeahead (incl. menu)?
    },
    render: function () {
        console.log('poop');
        this.renderWithTemplate();
        this.input = this.query('input') || this.query('textarea');
        this.menu = this.query('ul');
        // switches out input for textarea if that's what we want
        this.initInputBindings();
        // Skip validation on initial setValue
        // if the field is not required
        this.setValue(this.inputValue, !this.required);
        return this;
    },
    // Called by searchInput and whenever models change
    rerender: function (models) {
        this.menu.innerHTML = null;
        models.forEach(this.renderModel, this);
        if (models.length) {
          this.show();
        } else {
          this.hide();
        }
    },
    renderModel: function (model) {
        var li = document.createElement('li');
        var view = new ItemView({model: model});
        if (this.itemTemplate) {
          view = new ItemView({model: model, template: this.itemTemplate });
        }
        this.renderSubview(view, li);
        this.menu.appendChild(li);
      },
      // Return the models with a key that matches a portion of the given value
      search: function (value, callback) {
        if (this.collection.url) {
          var queryKey = this.queryKey;
          var parameters = {};
          parameters[queryKey] = value;
          this.collection.reset();
          this.collection.fetch({
            success: function (collection, response, options) {
              console.log('autocomplete response', response);
              callback(collection);
            }.bind(this),
            data: parameters
          });
        } else {
          // Use a regex to quickly perform a case-insensitive match
          var re = new RegExp(value, 'i');
          var key = this.idAttribute;
          callback(this.collection.filter(function (model) {
            return re.test(model.get(key));
          }));
        }
      },
      // Pull the value from the search input and re-render the matched models
      searchInput: function () {
        var self = this;
        if (this.input.value.length < this.minKeywordLength) {
          this.results = [];
          this.menu.innerHTML = null;
          this.hide();
          return;
        }
        this.search(this.input.value, function(results) {
          self.results = results;
          self.results.models = self.results.models.slice(0, self.maxResults);
          self.rerender(self.results);
        });
      },
      select: function () {
        var index = Array.prototype.indexOf.call(this.menu.childNodes, this.find(this.menu, '.active')[0]);
        if (index > -1) {
          this.selectModel(this.results.models[index]);
        }
      },
      selectModel: function (model) {
        // Update the input field with the key attribute of the select model
        var key = this.textAttribute;
        this.input.value = model.get(key);
        // Hide the menu
        this.hide();
        // TODO What other parameters should be in the trigger?
        this.trigger('selected', model, this.collection);
        // Empty the results
        this.results = [];
      },
      activateModel: function (model) {
        var el = this.find(this.menu, 'active');
        if (el && el.length) {
          this.removeClass(el, 'active');
        }
      },
      // Misc. events
      keyup: function (evt) {
        switch (evt.keyCode) {
          case 40: // Down arrow
          case 38: // Up arrow
          case 16: // Shift
          case 17: // Ctrl
          case 18: // Alt
            break;
          // case 9: // Tab - disabled to prevent rogue select on tabbed focus
          // TODO tab should also leave focus
          case 13: // Enter
            // TODO shown needs to be returned to its original function (as an
            // indicator of whether the menu is currently displayed or not)
            if (!this.shown) {
              return;
            }
            this.select();
            break;
          case 27: // escape
            if (!this.shown) {
              return;
            }
            this.hide();
            break;
          default:
            this.searchInput();
        }
        evt.stopPropagation();
        evt.preventDefault();
      },
      // Menu state
      focus: function () {
        this.focused = true;
        // TODO Only show the menu if no item has been selected
        if (!this.shown) {
          this.show();
        }
      },
      blur: function () {
        this.focused = false;
        if (!this.mousedover && this.shown) this.hide();
      },
      mouseenter: function () {
        this.mousedover = true;
        // TODO Re-add 'active' class to the current target
      },
      mouseleave: function () {
        this.mousedover = false;
        if (!this.focused && this.shown) this.hide();
      },
      // Allow the user to change their selection with the keyboard
      keydown: function (evt) {
        // TODO I still hate this array check
        var keycodes = [40, 38, 9, 13, 27];
        this.suppressKeyPressRepeat = keycodes.indexOf(evt.keyCode) !== -1;
        this.move(evt);
      },
      keypress: function (evt) {
        // The suppressKeyPressRepeat check exists because keydown and keypress
        // may fire for the same event
        if (this.suppressKeyPressRepeat) {
          return;
        }
        this.move(evt);
      },
      move: function (evt) {
        if (!this.shown) {
          return;
        }
        switch (evt.keyCode) {
          case 9: // Tab
          case 13: // Enter
          case 27: // Escape
            evt.preventDefault();
            break;
          case 38: // Up arrow
            evt.preventDefault();
            this.prevItem();
            break;
          case 40: // Down arrow
            evt.preventDefault();
            this.nextItem();
            break;
        }
        evt.stopPropagation();
      },
      prevItem: function () {
        var active = this.find(this.menu, '.active')[0];
        if (active) {
          this.removeClass(active, 'active');
        }
        var prev = active ? active.previousElementSibling : null;
        if (!prev) {
          var nodes = this.find(this.menu, 'li');
          prev = nodes[nodes.length-1];
        }
        this.addClass(prev, 'active');
      },
      nextItem: function () {
        var active = this.find(this.menu, '.active')[0];
        if (active) {
          this.removeClass(active, 'active');
        }
        var next = active ? active.nextElementSibling : null;
        if (!next) {
          next = this.find(this.menu, 'li')[0];
        }
        this.addClass(next, 'active');
      },
      // Show or hide the menu depending on the typeahead's state
      show: function () {
        // DO not show if there are no results
        if (!this.results.length) return;
        // var pos = this.input.style;
        // this.menu.style.top = pos.top + (this.input.offsetHeight + this.input.offsetTop);
        // this.menu.style.left = pos.left + this.input.offsetLeft;
        this.menu.style.display = 'block';
        this.shown = true;
        return this;
      },
      hide: function () {
        this.menu.style.display = 'none';
        this.shown = false;
        return this;
      },
      find: function (el, selector) {
        return el.querySelectorAll(selector);
      },
      removeClass: function (el, className) {
        if (el.classList) {
          el.classList.remove(className);
        } else {
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      },
      addClass: function (el, className) {
        if (el.classList) {
          el.classList.add(className);
        } else {
          el.className += ' ' + className;
        }
      },



    props: {
        inputValue: 'any',
        startingValue: 'any',
        collection: 'any',
        name: 'string',
        type: ['string', true, 'text'],
        placeholder: ['string', true, ''],
        label: ['string', true, ''],
        required: ['boolean', true, true],
        directlyEdited: ['boolean', true, false],
        readonly: ['boolean', true, false],
        shouldValidate: ['boolean', true, false],
        message: ['string', true, ''],
        requiredMessage: ['string', true, 'This field is required.'],
        validClass: ['string', true, 'input-valid'],
        invalidClass: ['string', true, 'input-invalid'],
        validityClassSelector: ['string', true, 'input, textarea']
    },
    events: {
        'keyup': 'keyup',
        'keypress': 'keypress',
        'keydown': 'keydown',
        'blur input': 'blur',
        'focus input': 'focus',
        'mouseenter': 'mouseenter',
        'mouseleave': 'mouseleave'
    },
    derived: {
        value: {
            deps: ['inputValue'],
            fn: function () {
                return this.inputValue;
            }
        },
        valid: {
            cache: false,
            deps: ['inputValue'],
            fn: function () {
                return !this.runTests();
            }
        },
        showMessage: {
            deps: ['message', 'shouldValidate'],
            fn: function () {
                return this.shouldValidate && this.message;
            }
        },
        changed: {
            deps: ['inputValue', 'startingValue'],
            fn: function () {
                return this.inputValue !== this.startingValue;
            }
        },
        validityClass: {
            deps: ['valid', 'validClass', 'invalidClass', 'shouldValidate'],
            fn: function () {
                if (!this.shouldValidate) {
                    return '';
                } else {
                    return this.valid ? this.validClass : this.invalidClass;
                }
            }
        }
    },
    setValue: function (value, skipValidation) {
        if (!this.input) {
            this.inputValue = value;
            return;
        }
        if (!value && value !== 0) {
            this.input.value = '';
        } else {
            this.input.value = value.toString();
        }
        this.inputValue = this.clean(this.input.value);
        if (!skipValidation && !this.getErrorMessage()) {
            this.shouldValidate = true;
        } else if (skipValidation) {
            this.shouldValidate = false;
        }
    },
    getErrorMessage: function () {
        var message = '';
        if (this.required && this.value === '') {
            return this.requiredMessage;
        } else {
            (this.tests || []).some(function (test) {
                message = test.call(this, this.value) || '';
                return message;
            }, this);
            return message;
        }
    },
    clean: function (val) {
        return (this.type === 'number') ? Number(val) : val.trim();
    },
    //`input` event handler
    handleInputChanged: function () {
        if (document.activeElement === this.input) {
            this.directlyEdited = true;
        }
        this.inputValue = this.clean(this.input.value);
    },
    //`change` event handler
    handleChange: function () {
        if (this.inputValue && this.changed) {
            this.shouldValidate = true;
        }
        this.runTests();
    },
    beforeSubmit: function () {
        // catch undetected input changes that were not caught due to lack of
        // browser event firing see:
        // https://github.com/AmpersandJS/ampersand-input-view/issues/2
        this.inputValue = this.clean(this.input.value);

        // at the point where we've tried
        // to submit, we want to validate
        // everything from now on.
        this.shouldValidate = true;
        this.runTests();
    },
    runTests: function () {
        var message = this.getErrorMessage();
        if (!message && this.inputValue && this.changed) {
            // if it's ever been valid,
            // we want to validate from now
            // on.
            this.shouldValidate = true;
        }
        this.message = message;
        return message;
    },
    initInputBindings: function () {
        this.input.addEventListener('input', this.handleInputChanged, false);
        this.input.addEventListener('change', this.handleChange,false);
    },
    remove: function () {
        this.input.removeEventListener('input', this.handleInputChanged, false);
        this.input.removeEventListener('change', this.handleChange, false);
        View.prototype.remove.apply(this, arguments);
    },
    reset: function () {
        this.setValue(this.startingValue, true); //Skip validation just like on initial render
    },
    clear: function () {
        this.setValue('', true);
    },
    validityClassChanged: function (view, newClass) {
        var oldClass = view.previousAttributes().validityClass;
        getMatches(this.el, this.validityClassSelector).forEach(function (match) {
            dom.switchClass(match, oldClass, newClass);
        });
    },
    reportToParent: function () {
        if (this.parent) this.parent.update(this);
    }
});
