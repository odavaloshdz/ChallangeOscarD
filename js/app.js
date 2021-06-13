var Temp = "";
$(document).ready(function() {
    $("#search").on('keyup', function() {
        var html = "";
        var counter = 0;
        if ($('#search').val().length > 3) {
            $.ajax({
                url: "https://restcountries.eu/rest/v2/name/" + $('#search').val(),
                type: "get",
                success: function(data) {
                    for (i in data) {
                        counter++;
                        html += '<div><a class="complete-element" searchData="' + data[i].name + '" data="' + data[i].name + ' ' + data[i].altSpellings + '" id="product' + counter + '">' + data[i].name + ' ' + data[i].altSpellings + '</a></div>';
                    }
                    $('#AutoComplete').fadeIn(1000).html(html);
                    $('.complete-element').on('click', function() {
                        var id = $(this).attr('id');
                        $('#key').val($('#' + id).attr('data'));
                        $('#AutoComplete').fadeOut(1000);
                        $('#search').val($('#' + id).attr('data'));
                        $('#search').attr('searchData', $('#' + id).attr('searchData'));
                    });
                }
            });
        } else {
            $('#AutoComplete').empty();
        }
    });
    $("#search").blur(function() {
        Temp = $('#search').val();
        $('#search').val('');
    });
    $('#searchButton').click(function() {
        $('#search').val('');
        $('#item').empty();
        if ($('#search').attr('searchData') != '') {
            $.ajax({
                url: "https://restcountries.eu/rest/v2/name/" + $('#search').attr('searchData') + "?fields=name;region;currencies;language;population;flag",
                type: "get",
                success: function(data) {
                    html = "<div class='card'>";
                    for (i in data) {

                        html += `
                        <article class="card">
                        <span><center>
                            <img src="${data[i].flag}" alt="" class="img-fluid">
                            <div class="card-content">
                                <h3>${data[i].name}</h3>
                                <p>
                                    <b>Region: </b> ${data[i].region}
                                </p>
                                <p>
                                    <b>Population: </b> ${data[i].population}
                                </p>                                          
                            </div>
                        `

                        for (z in data[i].currencies) {
                            html += '<b>Currency:</b>  <i>' + data[i].currencies[z].name + '</i>';
                        }
                        for (z in data[i].language) {
                            html += '<b>Language:</b>   <i>' + data[i].language[z].name + '</i>';
                        }
                        html += `
                        </span>
                        </article>
                        `
                    }
                    html += '</div>';
                    $('#item').append(html);
                }
            });
            $('#search').attr('searchData', '');
        } else {
            $('#AutoComplete').fadeOut(1000);
            $.ajax({
                url: "https://restcountries.eu/rest/v2/name/" + Temp + "?fields=name;region;currencies;language;population;flag",
                type: "get",
                success: function(data) {
                    html = "<div class='card'>";
                    for (i in data) {
                        html += `
                        <article class="card">
                        <span><center>
                            <img src="${data[i].flag}" alt="" class="img-fluid">
                            <div class="card-content">
                                <h3>${data[i].name}</h3>
                                <p>
                                    <b>Region: </b> ${data[i].region}
                                </p>
                                <p>
                                    <b>Population: </b> ${data[i].population}
                                </p>                                          
                            </div>
                        `
                        for (z in data[i].currencies) {
                            html += '<p class="card-text">Currency:<i>' + data[i].currencies[z].name + '</i></p>';
                        }
                        for (z in data[i].language) {
                            html += '<p class="card-text">Language:<i>' + data[i].language[z].name + '</i></p>';
                        }
                        html += '<p class="card-text">Population:<i>' + data[i].population.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '</p>';
                        html += `
                        </span>
                        </article>
                        `
                    }
                    html += '</div>';
                    $('#item').append(html);
                }
            });
        }
    });
});