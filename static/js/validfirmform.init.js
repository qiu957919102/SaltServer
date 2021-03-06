// 删除主机组信息
$(function () {
  $('.del_group').click(function () {
    var id = $(this).attr('CurlId');
    bootbox.confirm({
      title: "提示内容:",
      message: "删除操作是不可恢复的，你确认要删除吗？",
      buttons: {
        confirm: {
          label: '<i class="fa fa-times"></i> 确认',
          className: 'btn-success'
        },
        cancel: {
            label: '<i class="fa fa-check"></i> 取消',
            className: 'btn-danger'
        }
      },
      callback: function (result) {
        if (result) {
          $.post("/cmdb/group_delete/", {id: id}, function (result,status) {
            if (status == 'success') {
              var result = $.parseJSON(result);
              if (result.status == 'true') {
                bootbox.alert("<h4 class='text-center'>数据已成功删除!</h4>", function(){ window.location.reload(); });
              } else {
                bootbox.alert("<h4 class='text-center'>数据删除失败，主机组内可能存在主机，禁止删除!</h4>", function(){ window.location.reload(); });
              }
            }
          });
        }
      }
    });
  });
});

// 添加厂商信息
$(function () {
  $('#add_firmForm').bootstrapValidator({
    message: 'This value is not valid',
    fields: {
      manufactory: {
        validators: {
          notEmpty: {
            message: '厂商名称不能为空.'
          },
        }
      },
    }
  });
  $('.add_firmValid').click(function () {
    $('#add_firmForm').bootstrapValidator('validate');
    if ($('#add_firmForm').data("bootstrapValidator").isValid()){
      var manufactory = $('#manufactory').val();
      var support_num = $('#support_num').val();
      $.post('/cmdb/firm_add/', {manufactory: manufactory, support_num: support_num}, function (result, status) {
        if (status == 'success') {
          var result = $.parseJSON(result);
          if (result.status == 'true') {
            bootbox.alert("<h4 class='text-center'>数据添加成功!</h4>", function(){ window.location.reload(); });
          }
        }
      });
    } else {
      return;
    }
  });
  $('.add_firmReset').click(function () {
    $('#add_firmForm').data('bootstrapValidator').resetForm(true);
  });
});

// 更新厂商信息
$(function () {
  $('#up_groupForm').bootstrapValidator({
  fields: {
      name: {
        validators: {
          notEmpty: {
            message: '主机组名称不能为空.'
          },
          remote: {
            type: 'POST',
            url: '/api/group_valid/',
            data: {name: $('#name').val() },
            delay :  1000,
            message: '主机组名称已存在，请重新输入.'
          }
        }
      },
    }
  });
  $('.up_groupValid').click(function () {
    $('#up_groupForm').bootstrapValidator('validate');
    if ($('#up_groupForm').data("bootstrapValidator").isValid()){
      var id = $(this).attr('CurlId')
      var name = $('#name').val()
      $.post('/cmdb/group_update/', {id: id, name: name}, function (result, status) {
        if (status == 'success') {
          var result = $.parseJSON(result);
          if (result.status == 'true') {
            bootbox.alert("<h4 class='text-center'>数据更新成功!</h4>", function(){ self.location='/cmdb/group_list/'; });
          }
        }
      });
    } else {
      return;
    }
  });
  $('.up_groupReset').click(function () {
    $('#up_groupForm').data('bootstrapValidator').resetForm(true);
  });
});