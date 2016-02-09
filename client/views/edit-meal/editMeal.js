'use strict';

Template.editMeal.helpers({
  mealProperties: function() {
    var meal = Session.get('meal');
    if (!meal) return false;
    var retVal = _.map(MEAL_PROPERTIES, function(mealProperty) {
      return {
        id: mealProperty.htmlId,
        label: mealProperty.label,
        value: meal[mealProperty.databaseKeyName],
        type: mealProperty.type
      }
    });
    return retVal;
  },
  mealName: function() {
    let meal = Session.get('meal');
    return meal === undefined ? '' : meal.name;
  },
  editing: () => Session.get('editing')
});

Template.editMeal.events({
  'click .edit': () => Session.set('editing', true),
  'click .ok': function(){
    let currentMeal = Session.get('meal');
    let newMeal = {};
    for (let mealProperty of MEAL_PROPERTIES) {
      var element = $('#' + mealProperty.htmlId);
      var value;
      switch (mealProperty.type) {
        case 'textarea':
          value = element.val();
          break;
        case 'rating':
          value = $('label.active').text();
          break;
        case 'categories':
          value = $('#inputMealCategories').val();
          break;
        case 'servings':
          value = $('#inputMealServings option:selected').text();
          break;
        case 'comments':
          let oldComments = currentMeal[mealProperty.databaseKeyName];
          if (oldComments === undefined) {
            oldComments = []
          }

          let newComment = $('#inputMealComments').val();
          if (newComment.length !== 0) {
            oldComments.push(moment().format('YYYY-MM-DD') + ': ' + newComment);
          }

          value = oldComments;
          break;
        default:
          throw "Error: Tried to store unknown meal property type '" + mealProperty.type + "' to" +
          " the database"
      }
      if (typeof value === 'string') {
        value = $.trim(value);
      }
      newMeal[mealProperty.databaseKeyName] = value;
    }

    let oldMealName = currentMeal.name;
    if (oldMealName == undefined) {
      oldMealName = newMeal.name;
    }
    if (oldMealName === newMeal.name) {
      updateMealAndHideModal(oldMealName, newMeal);
    } else {
      if ($.trim(newMeal.name) === '') {
        showNameFieldError(STRINGS.nameEmptyString);
        return;
      }
      Meteor.call('mealExists', newMeal.name, function(error, mealExists) {
        if (mealExists) {
          showNameFieldError(STRINGS.nameAlreadyExists);
        } else {
          Meteor.call('updateMealNameInDaysDatabase', oldMealName, newMeal.name);
          updateMealAndHideModal(oldMealName, newMeal);
        }
      });
    }
  }
});

function showNameFieldError(text) {
  let divSurroundingNameField = $('#inputMealName').parent();
  divSurroundingNameField.addClass('has-error');
  let helpBlock = divSurroundingNameField.find('.help-block');
  helpBlock.text(text);
  helpBlock.css('display', 'inline');
}

function updateMealAndHideModal(oldMealName, meal) {
  Meteor.call('updateMeal', oldMealName, meal);
  loadMealNames(); // To make the meal blue. Should be done reactively instead.
  $('#editMealModal').modal('hide');
}

Template.editMeal.onRendered(function(){
  this.autorun(function(){
    Session.get("meal");
    Session.get('editing');
    // Resize textareas after loading data from the database and pressing the edit button
    Tracker.afterFlush(function() {
      $('textarea').each(function () {
        adjustTextAreaHeight(this);
      });
    });
  });
});

Template.categoriesField.onRendered(function() {
  var $select = $('#inputMealCategories').selectize({
    valueField: 'value',
    labelField: 'value',
    searchField: 'value',
    options: CATEGORIES
  });
  var selectize = $select[0].selectize;
  
  this.autorun(function(){
    var meal = Session.get("meal");
    let categoriesArray = meal.categories ? meal.categories.split(',') : [];
    selectize.setValue(categoriesArray);
  });
});

Template.mealProperty.helpers({
  equals: (a,b) => a==b,
  editing: () => Session.get('editing'),
  prepareValue: prepareValue
});

function linkify(text) {
  //var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  var urlRegex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
  return text.replace(urlRegex, function(url) {
    let targetUrl = url.startsWith('http') ? url : 'http://' + url;
    return '<a href="' + targetUrl + '" target="_blank">' + url + '</a>';
  });
}

Template.ratings.helpers({
  numbers: function() {
    var list = [];
    for (var i = 1; i<=5; i++) {
      var obj = {};
      obj.number = i;
      obj.active = this.value == i ? 'active' : '';
      list.push(obj);
    }
    return list
  }
});

Template.servings.helpers({
  servingNumbers: function() {
    let retVal = [];
    for (let i=1; i<=10; i++) {
      retVal.push({
        number: i,
        selected: i==this.value ? 'selected' : ''
      })
    }
    return retVal;
  }
});

Template.comments.helpers({
  prepareValue: prepareValue
});

function prepareValue(s) {
  if (typeof s === 'string') {
    s = escapeHtml(s);
    s = linkify(s);
  } else if (s === undefined) {
    return '';
  } else {
    // assume array of strings
    let escapedArray = [];
    for (let text of s) {
      escapedArray.push(escapeHtml(text));
    }
    s = escapedArray.join('<br>');
  }
  s = s.replace(/\n/g, '<br>');
  return s;
}

function escapeHtml(text) {
  'use strict';
  return text.replace(/[\"&<>]/g, function (a) {
    return { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' }[a];
  });
}