TextareaAutocompleter = class TextareaAutocompleter {
  constructor() {
    this.textareaSelectionStart = undefined;
    this.autocompleteIsHighlighted = false;
    this.autocompleteStart = 0;
    this.autocompleteEnd = 0;
  }

  keydown(textarea, keycode) {
    if (textarea.selectionStart !== this.autocompleteStart ||
      textarea.selectionEnd !== this.autocompleteEnd) {
      this.autocompleteIsHighlighted = false;
    }
    if (keycode === 8 && this.autocompleteIsHighlighted) {
      textarea.value = textarea.value.substr(0,textarea.selectionStart);
    }
  }

  keyup(textarea, mealNames) {
    if (this.textareaSelectionStart === undefined) {
      this.textareaSelectionStart = 0;
    }
    if (textarea.selectionStart > this.textareaSelectionStart) {
      let textareaText = textarea.value;
      if (textareaText === '') {
        return;
      }
      mealNames = mealNames ? mealNames : [];
      mealNames = mealNames.filter((s) => s !== '' && s !== null);
      for (let mealName of mealNames) {
        if (mealName.startsWith(textareaText)) {
          textarea.value = mealName;
          textarea.setSelectionRange(textareaText.length, 88888);
          this.autocompleteIsHighlighted = true;
          this.autocompleteStart = textarea.selectionStart;
          this.autocompleteEnd = textarea.selectionEnd;
        }
      }
    }
    this.textareaSelectionStart = textarea.selectionStart;
  }
};
