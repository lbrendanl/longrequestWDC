(function() {
     var myConnector = tableau.makeConnector();

     myConnector.getSchema = function(schemaCallback) {
         var schema = [];
         var cols = [
             { id: "data", alias: "DummyData", dataType: tableau.dataTypeEnum.int }
         ];

         var tableInfo = {
            id: "test",
            columns: cols
         };

         schema.push(tableInfo);
         schemaCallback(schema);
     };

     myConnector.getData = function(table, doneCallback) {
         setTimeout(function() {
             table.appendRows([{ "data": 1}]);
             doneCallback();
         }, 120000);
     };

     setupConnector = function() {
        tableau.connectionName = 'Long request test';
        tableau.submit();
     };

     tableau.registerConnector(myConnector);

     $(document).ready(function() {
         $("#submitButton").click(function() { 
             setupConnector();
         });
         $('#tickerForm').submit(function(event) {
             event.preventDefault();
             setupConnector();
         });
     });
 })();