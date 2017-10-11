(function () {
    anychart.format.inputDateTimeFormat('MM/dd/yyyy');
    var $datetimepicker_start = $('#datetimepicker_start');
    var $datetimepicker_end = $('#datetimepicker_end');
    var $nav = $('#nav-date-time');
    var $button_set_date = $('button#set-date');
    var $toggle_chart = $('.toggle-chart');
    var today = +new Date($nav.find('[data-range="today"]').data('time')) + new Date().getTimezoneOffset() * 60 * 1000;
    today = new Date(today);
    var week = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 6), 23, 59).getTime();
    var tickets = [];
    var defaultDateStart;
    var defaultDateEnd;
    var minDate;
    var maxDate;
    var from;
    var to;
    var chartColumn = anychart.column();
    var chartData1;
    var chartData2;
    var chartData3;
    var chartData4;
    var chartData5;

    //Draw Tickets Timeline Line Chart
    function createChart1(chartData1) {
        var chartSeriesData1 = chartData1.mapAs({x: 'date', value: 'call center'});
        var chartSeriesData2 = chartData1.mapAs({x: 'date', value: 'email'});
        var chartSeriesData3 = chartData1.mapAs({x: 'date', value: 'site'});
        var chartSeriesData4 = chartData1.mapAs({x: 'date', value: 'live chat'});

        var chart = anychart.line();
        var chartCall = chart.line(chartSeriesData1);
        chartCall
            .markers('circle')
            .zIndex(43)
            .clip(false);

        var chartEmail = chart.line(chartSeriesData2);
        chartEmail
            .markers('circle')
            .zIndex(42)
            .clip(false);

        var chartSite = chart.line(chartSeriesData3);
        chartSite
            .markers('circle')
            .zIndex(41)
            .clip(false);

        var chartChat = chart.line(chartSeriesData4);
        chartChat
            .markers('circle')
            .zIndex(40)
            .clip(false);

        chart.xScale('date-time');

        var chartXScale = chart.xScale();
        chartXScale
            .minimumGap(0)
            .maximumGap(0);

        var chartSeriesCall = chart.getSeries(0);
        chartSeriesCall.name('Call center');

        var chartSeriesEmail = chart.getSeries(1);
        chartSeriesEmail.name('Email');

        var chartSeriesSite = chart.getSeries(2);
        chartSeriesSite.name('Site');

        var chartSeriesChat = chart.getSeries(3);
        chartSeriesChat.name('Live chat');

        var chartTitle = chart.title();
        chartTitle
            .enabled(true)
            .text('Tickets Timeline')
            .textOverflow('...')
            .align('left');

        var chartLegend = chart.legend();
        chartLegend
            .enabled(true)
            .align('right');

        var chartTooltip = chart.tooltip();
        chartTooltip
            .displayMode('union')
            .titleFormat(function () {
                return anychart.format.dateTime(this.points[0].x, 'MM/dd/yyyy');
            });

        var chartXAxisLabels = chart.xAxis().labels();
        chartXAxisLabels
            .format(function () {
                return anychart.format.dateTime(this.tickValue, 'MM/dd/yyyy');
            });

        chart.container('chart1').draw();
    }

    //Draw Tickets Timeline Column Chart
    function createChart2(chartData1) {
        var chartSeriesData1 = chartData1.mapAs({x: 'date', value: 'call center'});
        var chartSeriesData2 = chartData1.mapAs({x: 'date', value: 'email'});
        var chartSeriesData3 = chartData1.mapAs({x: 'date', value: 'site'});
        var chartSeriesData4 = chartData1.mapAs({x: 'date', value: 'live chat'});

        var chart = chartColumn;
        chart.column(chartSeriesData1);
        chart.column(chartSeriesData2);
        chart.column(chartSeriesData3);
        chart.column(chartSeriesData4);

        chart.yScale().stackMode('value');

        var chartSeriesCall = chart.getSeries(0);
        chartSeriesCall.name('Call center');

        var chartSeriesEmail = chart.getSeries(1);
        chartSeriesEmail.name('Email');

        var chartSeriesSite = chart.getSeries(2);
        chartSeriesSite.name('Site');

        var chartSeriesChat = chart.getSeries(3);
        chartSeriesChat.name('Live chat');

        var chartTitle = chart.title();
        chartTitle
            .enabled(true)
            .text('Tickets Timeline')
            .textOverflow('...')
            .align('left');

        var chartLegend = chart.legend();
        chartLegend
            .enabled(true)
            .align('right');

        var chartTooltip = chart.tooltip();
        chartTooltip
            .displayMode('union')
            .titleFormat(function () {
                return anychart.format.dateTime(this.points[0].x, 'MM/dd/yyyy');
            });

        var chartXAxisLabels = chart.xAxis().labels();
        chartXAxisLabels
            .format(function () {
                return anychart.format.dateTime(this.tickValue, 'MM/dd/yyyy');
            });

        var chartTicks = chart.xScale().ticks();
        chartTicks
            .interval(0.5);

        chart.container('chart2').draw();
    }

    //Draw Number of Overdue Tickets
    function createChart3(chartData2) {
        var chartSeriesData = chartData2.mapAs({x: 'key', value: 'count'});
        var chart = anychart.pie(chartSeriesData);

        var chartTitle = chart.title();
        chartTitle
            .enabled(true)
            .text('Number of Overdue Tickets')
            .align('left');

        var chartPalette = anychart.palettes.rangeColors();
        chartPalette.items([
            {color: '#64b5f6'},
            {color: '#455a64'}
        ]);

        chart.innerRadius('60%');

        chart.palette(chartPalette);

        var chartLegend = chart.legend();
        chartLegend
            .enabled(true)
            .position('right')
            .itemsLayout("vertical")
            .align("top");

        chart.container('chart3').draw();
    }

    //Draw Types of Problems
    function createChart4(chartData3) {
        var chartSeriesData = chartData3.mapAs({x: 'label', value: 'count'});
        var chart = anychart.bar(chartSeriesData);

        var chartTitle = chart.title();
        chartTitle
            .enabled(true)
            .text('Types of Problems')
            .textOverflow('...')
            .align('left');

        var chartSeries = chart.getSeries(0);
        chartSeries.name('Amount of Tickets');

        chart.container('chart4').draw();
    }

    //Draw Tickets by Customer Types
    function createChart5(chartData4) {
        var chartSeriesData = chartData4.mapAs({x: 'priority', value: 'count'});
        var chart = anychart.pie(chartSeriesData);

        var chartTitle = chart.title();
        chartTitle
            .enabled(true)
            .text('Tickets by Customer Types')
            .align('left');

        var chartPalette = anychart.palettes.rangeColors();
        chartPalette.items([
            {color: '#64b5f6'},
            {color: '#455a64'}
        ]);

        chart.innerRadius('60%');

        chart.palette(chartPalette);

        var chartLegend = chart.legend();
        chartLegend
            .enabled(true)
            .position('right')
            .itemsLayout("vertical")
            .align("top");

        chart.container('chart5').draw();
    }

    //Draw Tech Support Engineers
    function createChart6(chartData5) {
        var chartSeriesData1 = chartData5.mapAs({x: 'assigner', value: 'all'});
        var chartSeriesData2 = chartData5.mapAs({x: 'assigner', value: 'open'});
        var chartSeriesData3 = chartData5.mapAs({x: 'assigner', value: 'escalated'});

        var chart = anychart.bar();
        var allTickets = chart.bar(chartSeriesData1);
        var openTickets = chart.bar(chartSeriesData2);
        var escTickets = chart.bar(chartSeriesData3);

        allTickets.xPointPosition(0.5);
        escTickets.xPointPosition(0.7);
        openTickets.xPointPosition(0.3);

        var chartSeriesAll = chart.getSeries(0);
        chartSeriesAll.name('All Processed Tickets');

        var chartSeriesEsc = chart.getSeries(2);
        chartSeriesEsc.name('Escalated Tickets');

        var chartSeriesOpen = chart.getSeries(1);
        chartSeriesOpen.name('Opening Tickets');

        var chartTitle = chart.title();
        chartTitle
            .enabled(true)
            .text('Tech Support Engineers')
            .textOverflow('...')
            .align('left');

        var chartLegend = chart.legend();
        chartLegend
            .enabled(true)
            .align('right');

        chart.tooltip().displayMode('union');

        chart.container('chart6').draw();
    }

    //Initialization DateTimePicker and default dates
    function initDateTime() {
        $datetimepicker_start.datetimepicker();
        $datetimepicker_end.datetimepicker();

        $datetimepicker_start.on("dp.change", function (e) {
            $(this).datetimepicker('hide');
            $nav.find('li').removeClass('active');
        });

        $datetimepicker_end.on("dp.change", function (e) {
            $(this).datetimepicker('hide');
            $nav.find('li').removeClass('active');
        });

        defaultDateStart = anychart.format.dateTime(week, "MM/dd/yyyy HH:mm", new Date().getTimezoneOffset());
        defaultDateEnd = anychart.format.dateTime(today.getTime(), "MM/dd/yyyy HH:mm", new Date().getTimezoneOffset());

        $datetimepicker_start.data('DateTimePicker').date(defaultDateStart);
        $datetimepicker_end.data('DateTimePicker').date(defaultDateEnd);

        initToggle();
    }

    //Navigation bar and timerange
    $nav.on('click', 'a', function () {
        var range = $(this).data('range');

        switch (range) {
            case 'today': {
                from = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 1).getTime() / 1000;
                to = today.getTime() / 1000;
                break;
            }
            case 'yesterday': {
                from = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 1), 0, 0).getTime() / 1000;
                to = today.getTime() / 1000;
                break;
            }
            case 'week': {
                from = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 6), 23, 59).getTime() / 1000;
                to = today.getTime() / 1000;
                break;
            }
            case 'month': {
                from = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate(), 23, 59).getTime() / 1000;
                to = today.getTime() / 1000;
                break;
            }
            case 'quarter': {
                from = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate(), 23, 59).getTime() / 1000;
                to = today.getTime() / 1000;
                chartColumn.xScroller().enabled(true);
                chartColumn.xZoom().setTo(0, 0.2);
                break;
            }
            case 'full': {
                from = minDate;
                to = today.getTime() / 1000;
                chartColumn.xScroller().enabled(true);
                chartColumn.xZoom().setTo(0, 0.15);
            }
        }

        $datetimepicker_start.data('DateTimePicker').date(anychart.format.dateTime(from * 1000, "MM/dd/yyyy HH:mm", new Date().getTimezoneOffset()));
        $datetimepicker_end.data('DateTimePicker').date(anychart.format.dateTime(to * 1000, "MM/dd/yyyy HH:mm", new Date().getTimezoneOffset()));

        filterByDate(tickets, from, to);

        $(this).parents($nav).find('li').removeClass('active');
        $(this).closest('li').addClass('active');
    });

    // Button "Set Date" pressed
    $button_set_date.on('click', function () {
        from = new Date($datetimepicker_start.data('DateTimePicker').date().toDate()).getTime() / 1000;
        to = new Date($datetimepicker_end.data('DateTimePicker').date().toDate()).getTime() / 1000;

        filterByDate(tickets, from, to)
    });

    function processData() {
        minDate = Math.ceil(Date.now() / 1000);
        maxDate = 0;

        for (var i = 0, len = tickets.length; i < len; i++) {
            var ticket = tickets[i];
            var eta = ticket.eta;
            var duration = ticket.closing - ticket.opening;

            //Finding min, max date
            if (ticket.opening < minDate) minDate = ticket.opening;
            if (ticket.closing > maxDate) maxDate = ticket.closing;

            //Calculation a ticket's duration
            if (duration > eta) {
                ticket.duration = 'Overdue'
            } else ticket.duration = 'Allright';
        }

        $('[data-range="week"]').closest('li').addClass('active');
    }

    //Filtering data by date
    function filterByDate(data, dateStart, dateEnd) {
        dateStart = Math.ceil(dateStart) || (new Date(defaultDateStart)).getTime() / 1000;
        dateEnd = Math.ceil(dateEnd) || (new Date(defaultDateEnd)).getTime() / 1000;

        var labels = {};
        var assigners = {};
        var priorities = {};
        var durations = {};
        var sources = {};
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var data4 = [];
        var data5 = [];

        for (var i = 0, len = data.length; i < len; i++) {
            var ticket = data[i];

            if (+ticket.opening >= dateStart && +ticket.closing <= dateEnd) {

                var label = ticket.label;
                var assigner = ticket.assigner;
                var priority = ticket.priority;
                var duration = ticket.duration;
                var source = ticket.source;
                var peopleDate = anychart.format.dateTime(ticket.opening * 1000, "MM/dd/yyyy");

                if (!sources[peopleDate]) sources[peopleDate] = {email: 0, call: 0, site: 0, chat: 0};
                if (source == 'email') sources[peopleDate].email++;
                if (source == 'call center') sources[peopleDate].call++;
                if (source == 'site') sources[peopleDate].site++;
                if (source == 'live chat') sources[peopleDate].chat++;

                if (durations[duration]) durations[duration]++;
                else durations[duration] = 1;

                if (priorities[priority]) priorities[priority]++;
                else  priorities[priority] = 1;

                if (labels[label]) labels[label]++;
                else labels[label] = 1;

                if (!assigners[assigner]) assigners[assigner] = {all: 0, escalated: 0, open: 0};
                assigners[assigner].all++;
                if (ticket.escalated) assigners[assigner].escalated++;
                if (ticket.status == 'open') assigners[assigner].open++;
            }
        }

        for (var key1 in sources) {
            data1.push({
                'date': key1,
                'call center': sources[key1].call,
                'email': sources[key1].email,
                'site': sources[key1].site,
                'live chat': sources[key1].chat
            });
        }

        for (var key2 in durations) {
            data2.push({'key': key2, 'count': durations[key2]})
        }

        for (var key3 in labels) {
            data3.push({'label': key3, 'count': labels[key3]});
        }

        for (var key4 in priorities) {
            data4.push({'priority': key4, 'count': priorities[key4]});
        }

        for (var key5 in assigners) {
            data5.push({
                'assigner': key5,
                'all': assigners[key5].all,
                'escalated': assigners[key5].escalated,
                'open': assigners[key5].open
            });
        }

        function sortArrayAscending(field) {
            return function (a, b) {
                return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
            }
        }

        function sortArrayDescending(field) {
            return function (a, b) {
                return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
            }
        }

        data1.sort(sortArrayAscending('date'));
        data2.sort(sortArrayAscending('key'));
        data3.sort(sortArrayDescending('count'));
        data4.sort(sortArrayAscending('priority'));
        data5.sort(sortArrayAscending('assigner'));

        if (chartData1) {
            chartData1.data(data1);
            chartData2.data(data2);
            chartData3.data(data3);
            chartData4.data(data4);
            chartData5.data(data5)
        } else {
            chartData1 = anychart.data.set(data1);
            chartData2 = anychart.data.set(data2);
            chartData3 = anychart.data.set(data3);
            chartData4 = anychart.data.set(data4);
            chartData5 = anychart.data.set(data5)
        }
    }

    function getData() {
        $.getJSON('dummy-data.json', function (data) {
            tickets = data;
            processData();
            filterByDate(tickets);
            createChart1(chartData1);
            createChart2(chartData1);
            createChart3(chartData2);
            createChart4(chartData3);
            createChart5(chartData4);
            createChart6(chartData5);
        })
    }

    function hidePreloader() {
        $('#loader-wrapper').fadeOut('slow');
    }

    function initToggle() {
        $('.chart_container').each(function () {
            var $parent = $(this);

            if ($(this).attr('data-visible') === 'line') {
                $parent.find('.column-container').hide();
                $parent.find('.line-container').show();

                $parent.find('.icon-line').show();
                $parent.find('.icon-column').hide();

            } else if ($(this).attr('data-visible') === 'column') {
                $parent.find('.line-container').hide();
                $parent.find('.column-container').show();

                $parent.find('.icon-line').hide();
                $parent.find('.icon-column').show();

                $(this).addClass('active')
            }
        });
    }

    $(window).on('load', function () {
        hidePreloader();
    });

    $toggle_chart.on('click', function () {
        var $parent = $(this).closest('.chart_container');

        if ($parent.attr('data-visible') === 'column') {
            $parent.find('.column-container').fadeOut('fast', function () {
                $parent.find('.line-container').fadeIn('slow');

                $parent.find('.icon-line').show();
                $parent.find('.icon-column').hide();

                $parent.attr('data-visible', 'line');
            });

        } else if ($parent.attr('data-visible') === 'line') {
            $parent.find('.line-container').fadeOut('fast', function () {
                $parent.find('.column-container').fadeIn('slow');
                $parent.attr('data-visible', 'column');

                $parent.find('.icon-line').hide();
                $parent.find('.icon-column').show();
            });
        }
    });

    anychart.onDocumentReady(function () {
        initDateTime();
        getData();
    });
})();