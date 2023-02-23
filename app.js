d3.dsv('|','./dataset/TextBlobResultswithMedian.csv').then(function (data) {

  var companies = data;

  var button = d3.select('#button');

  var form = d3.select('#form');

  button.on('click', runEnter);
  form.on('submit', runEnter);

  function runEnter() {
    d3.select('tbody').html('');
    d3.selectAll('p').classed('noresults', true).html('');
    d3.event.preventDefault();
    var inputElement = d3.select('#user-input');
    var inputValue = inputElement.property('value').toLowerCase().trim();

    console.log(inputValue.length);
    console.log(companies);
    if (inputValue.length < 3) {
      d3.select('p')
        .classed('noresults2', true)
        .html(
          '<center><strong>Please try using more than 2 characters to avoid too many results!</strong>'
        );
      inputValue = 'Something to give no results';
    }
    var filteredData = companies.filter((companies) =>
      companies.Company.toLowerCase().trim().includes(inputValue)
    );
    if (
      filteredData.length === 0 &&
      inputValue !== 'Something to give no results'
    ) {
      d3.select('p')
        .classed('noresults', true)
        .html(
          '<center><strong>No results. Please check your spelling!</strong>'
        );
    }

    positive_score_recommendations = [
      'The employees at this company feel they have a good work/life balance.',
      'Great team bonding, supportive leadership, growth opportunities, progressive in values/culture.',
      'Your employees find this a great place to work, keep it up!',
      'Employees at this company reported to have great pay, flexible working hours and good opportunities for career advancement.'
    ];

    negative_score_recommendations = [
      'Stressful work environment with impossible deadlines. Spend more time in sprint plannings.',
      'Average pay with no benefits. Provide more incentives to employees for work completion.',
      'Management lacks leadership leading to high employee churn. Take charge of situations to help get your employees issues resolved.',
      'Teammates are not sharing knowledge or able to communicate effectively with one another. Organise more team bonding activites.',
      'Long continuous working hours have been reported. Take your team out for meals, movies, picnics.',
      'Inter-team disputes have been observed. Take actions to resolve these conflicts in a professional manner.'
    ];

    for (var i = 0; i < filteredData.length; i++) {
      if (filteredData[i]['SENTIMENT_LABEL'] == 'positive') {
        filteredData[i]['RECOMMENDATION'] =
          positive_score_recommendations[
            Math.floor(Math.random() * positive_score_recommendations.length)
          ];
      } else {
        filteredData[i]['RECOMMENDATION'] =
          negative_score_recommendations[
            Math.floor(Math.random() * negative_score_recommendations.length)
          ];
      }
    }

    console.log(filteredData);
    output = _.sortBy(filteredData, 'SCORE').reverse();

    for (var i = 0; i < filteredData.length; i++) {
      d3.select('tbody')
        .insert('tr')
        .html(
          '<td>' +
            [i + 1] +
            '</td>' +
            '<td>' +
            output[i]['Company'] +
            '</td>' +
            '<td>' +
            output[i]['SCORE'] +
            '</td>' +
            '<td>' +
            output[i]['SENTIMENT_LABEL'] +
            '</td>' +
            '<td>' +
            output[i]['RECOMMENDATION'] +
            '</td>'
        );
    }
  }
  window.resizeTo(screen.width, screen.height);
});
