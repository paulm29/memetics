import {Directive, ElementRef, Input} from '@angular/core';

@Directive({ selector: '[disableAll]' })
export class DisableAllDirective {
  @Input('disableAll') toDisable: boolean;
  disableElement;
  childNodeCount: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.disableElement = this.el.nativeElement;
    this.childNodeCount = this.disableElement.childNodeCount;
    this.toggleDisableAll(this.disableElement, this.toDisable);

    var observer = new MutationObserver((mutations) => {
      // Ignore class changes since disable/enable toggles "disable-all" class which triggers observer and causes infinite loop
      var nonClassChanges = mutations.some((mutation) => {
        return mutation.attributeName != "class";
      });
      if (nonClassChanges) {
        this.toggleDisableAll(this.disableElement, this.toDisable);
      }
    });

    var observerConfig = {attributes: true, childList: true};
    observer.observe(this.disableElement, observerConfig);
  }

  ngOnChanges() {
    if (this.disableElement) {
      this.toggleDisableAll(this.disableElement, this.toDisable);
    }
  }

  ngOnDestroy() {
    this.enableAll(this.disableElement);
  }

  private toggleDisableAll(element, isDisabled) {
    if (isDisabled) {
      this.disableAll(element);
    }
    else {
      this.enableAll(element);
    }
  };

  /**
   * Disables everything in the given element.
   */
  disableAll(element) {
    element.classList.add("disable-all");
    element.style.color = "gray";
    this.disableElements(element.getElementsByTagName("input"));
    this.disableElements(element.getElementsByTagName("button"));
    this.disableElements(element.getElementsByTagName("textarea"));
    this.disableElements(element.getElementsByTagName("select"));
    element.addEventListener("click", this.preventDefault, true);
  };

  /**
   * Enables everything in the given element.
   */
  enableAll(element) {
    element.classList.remove("disable-all");
    element.style.color = "inherit";
    this.enableElements(element.getElementsByTagName("input"));
    this.enableElements(element.getElementsByTagName("button"));
    this.enableElements(element.getElementsByTagName("textarea"));
    this.enableElements(element.getElementsByTagName("select"));
    element.removeEventListener("click", this.preventDefault, true);
  };

  /**
   * Callback used to prevent user clicks.
   */
  preventDefault(event) {
    for (var i = 0; i < event.target.attributes.length; i++) {
      var atts = event.target.attributes[i];
      if(atts.name === "skip-disable"){
        return true;
      }
    }
    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  /**
   * Disables given elements.
   */
  disableElements(elements) {
    var len = elements.length;
    for (var i = 0; i < len; i++) {
      var shouldDisable = true;
      for (var j = 0; j < elements[i].attributes.length; j++) {
        var atts = elements[i].attributes[j];
        if(atts.name === "skip-disable"){
          shouldDisable = false;
          continue;
        }
      }
      if (shouldDisable && elements[i].disabled === false) {
        elements[i].disabled = true;
        elements[i].disabledIf = true;
      }
    }
  };

  /**
   * Enables given elements.
   */
  enableElements(elements) {
    var len = elements.length;
    for (var i = 0; i < len; i++) {
      if (elements[i].disabled === true && elements[i].disabledIf === true) {
        elements[i].disabled = false;
        elements[i].disabledIf = null;
      }
    }
  };
}
