$(document).ready(function() {
    
    var toggleActive = function(activate)
    {       
       // de-activate any existing selection
       $('#smoking-filters').find('.btn-primary').each(function(index, element) {
         $(element).removeClass('active');
       });
       activate.addClass('active');
    }
  
    $.fn.dataTable.ext.search.push(
      function(settings, data, dataIndex) {
        var yes = $('#gridDisplayYes')[0].checked;
        var no = $('#gridDisplayNo')[0].checked;
        var all = $('#gridDisplayAll')[0].checked;
        var condition = String(data[5]); // check condition
        if (all) {
           toggleActive($('#gridDisplayAllLabel'));
           return true;
        } else if (yes) {
           toggleActive($('#gridDisplayYesLabel'));
           return ("Y" == condition);
        } else if (no) {
           toggleActive($('#gridDisplayNoLabel'));      
           return ("N" == condition);
        }
        return false;
      }
    );

    var toggleActive = function(activate)
    {       
       // de-activate any existing selection
       $('#pets-filters').find('.btn-primary').each(function(index, element) {
         $(element).removeClass('active');
       });
       activate.addClass('active');
    }
  
    $.fn.dataTable.ext.search.push(
      function(settings, data, dataIndex) {
        var yes = $('#gridDisplayYes2')[0].checked;
        var no = $('#gridDisplayNo2')[0].checked;
        var all = $('#gridDisplayAll2')[0].checked;
        var condition = String(data[6]); // check condition
        if (all) {
           toggleActive($('#gridDisplayAllLabel2'));
           return true;
        } else if (yes) {
           toggleActive($('#gridDisplayYesLabel2'));
           return ("Y" == condition);
        } else if (no) {
           toggleActive($('#gridDisplayNoLabel2'));      
           return ("N" == condition);
        }
        return false;
      }
    );
  });