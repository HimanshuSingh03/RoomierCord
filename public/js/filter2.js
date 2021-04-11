//javascript for the radio button (smokinh, pets) filters of the datatable

$(document).ready(function () {

   //smoking filter functions
   var toggleActive = function (activate) {
      // de-activate any existing selection
      $('#smoking-filters').find('.btn-primary').each(function (index, element) {
         $(element).removeClass('active');
      });
      activate.addClass('active');
   }

   $.fn.dataTable.ext.search.push(
      //function to check which radio button is checked
      function (settings, data, dataIndex) {
         var yes = $('#gridDisplayYes')[0].checked;
         var no = $('#gridDisplayNo')[0].checked;
         var all = $('#gridDisplayAll')[0].checked;
         var smoking = String(data[5]); // check values of smoking column for each row

         if (all) {
            toggleActive($('#gridDisplayAllLabel'));
            return true; //returns true if All is checked
         } else if (yes) {
            toggleActive($('#gridDisplayYesLabel'));
            return ("Y" == smoking);
         } else if (no) {
            toggleActive($('#gridDisplayNoLabel'));
            return ("N" == smoking);
         }
         return false; //return false hides row, return true keeps row visible
      }
   );

   //pets filter functions
   var toggleActive = function (activate) {
      // de-activate any existing selection
      $('#pets-filters').find('.btn-primary').each(function (index, element) {
         $(element).removeClass('active');
      });
      activate.addClass('active');
   }

   $.fn.dataTable.ext.search.push(
      //function to check which radio button is checked
      function (settings, data, dataIndex) {
         var yes = $('#gridDisplayYes2')[0].checked;
         var no = $('#gridDisplayNo2')[0].checked;
         var all = $('#gridDisplayAll2')[0].checked;
         var pets = String(data[6]); // check values of pets column for each row
         if (all) {
            toggleActive($('#gridDisplayAllLabel2'));
            return true; //returns true if All is checked
         } else if (yes) {
            toggleActive($('#gridDisplayYesLabel2'));
            return ("Y" == pets);
         } else if (no) {
            toggleActive($('#gridDisplayNoLabel2'));
            return ("N" == pets);
         }
         return false; //return false hides row, return true keeps row visible
      }
   );
});