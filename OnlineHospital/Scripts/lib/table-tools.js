/* JavaScript functions created
 * by Stoyan Bonchev for navigation
 * in the tables.
 * For KEA school project E-Doctor. 2014.
  */

/* search bar starts */

function doSearch() {
    var searchText = document.getElementById('searchForm').value;
    var targetTable = document.getElementById('patientTable');
    var targetTableColCount;

    //Loop through table rows
    for (var rowIndex = 0; rowIndex < targetTable.rows.length; rowIndex++) {
        var rowData = '';

        //Get column count from header row
        if (rowIndex == 0) {
            targetTableColCount = targetTable.rows.item(rowIndex).cells.length;
            continue; //do not execute further code for header row.
        }

        //Process data rows. (rowIndex >= 1)
        for (var colIndex = 0; colIndex < targetTableColCount; colIndex++) {
            rowData += targetTable.rows.item(rowIndex).cells.item(colIndex).textContent;
        }

        //If search term is not found in row data
        //then hide the row, else show
        if (rowData.indexOf(searchText) == -1)
            targetTable.rows.item(rowIndex).style.display = 'none';
        else
            targetTable.rows.item(rowIndex).style.display = 'table-row';
    }
}

/* search bar ends */

/* pagination section starts */

function Pager(tableName, itemsPerPage) {

    this.tableName = tableName;

    this.itemsPerPage = itemsPerPage;

    this.currentPage = 1;

    this.pages = 0;

    this.inited = false;

    this.showRecords = function(from, to) {

        var rows = document.getElementById(tableName).rows;

        // i starts from 1 to skip table header row

        for (var i = 1; i < rows.length; i++) {

            if (i < from || i > to)
                rows[i].style.display = 'none';

            else
                rows[i].style.display = '';

        }

    };
    this.showPage = function(pageNumber) {

        if (!this.inited) {

            alert("not inited");

            return;

        }

        var oldPageAnchor = document.getElementById('pg' + this.currentPage);

        oldPageAnchor.className = 'pg-normal';

        this.currentPage = pageNumber;

        var newPageAnchor = document.getElementById('pg' + this.currentPage);

        newPageAnchor.className = 'pg-selected';

        var from = (pageNumber - 1) * itemsPerPage + 1;

        var to = from + itemsPerPage - 1;

        this.showRecords(from, to);

    };
    this.prev = function() {

        if (this.currentPage > 1)
            this.showPage(this.currentPage - 1);

    };
    this.next = function() {

        if (this.currentPage < this.pages) {

            this.showPage(this.currentPage + 1);

        }

    };
    this.init = function() {

        var rows = document.getElementById(tableName).rows;

        var records = (rows.length - 1);

        this.pages = Math.ceil(records / itemsPerPage);

        this.inited = true;

    };
    this.showPageNav = function(pagerName, positionId) {

        if (!this.inited) {

            alert("not inited");

            return;

        }

        var element = document.getElementById(positionId);

        var pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal"> « Prev </span> ';

        for (var page = 1; page <= this.pages; page++)
            pagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span> ';

        pagerHtml += '<span onclick="' + pagerName + '.next();" class="pg-normal"> Next »</span>';

        element.innerHTML = pagerHtml;

    };
}

/* pagination sections ends */