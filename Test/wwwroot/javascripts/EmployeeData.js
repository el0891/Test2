function EmployeesContorl(data){
    var dataGrid = $("#EmployeesGrid").dxDataGrid({
        dataSource: data,
        allowColumnReordering: true,
        selection: {
            mode: 'multiple'
        },
        grouping: {
            autoExpandAll: true,
        },
        searchPanel: {
            visible: true
        },
        paging: {
            pageSize: 0
        },  
        groupPanel: {
            visible: true
        },
        columns: [
            {
                caption: "EmployeeName",
                dataField: "EmployeeName",
                groupIndex: 1
            },
            {
                caption: "EmployeeSalary",
                dataField: "EmployeeSalary",
            },
            {
                caption: "",
                dataField: "DapartmentId",
                visible: false
            },
            {
                caption: "DepartmentName",
                dataField: "DepartmentName",
                groupIndex: 0,
                showcaption: false
            },
            {
                caption: "",
                dataField: "EmployeeId",
                visible: false
            }
        ]
    }).dxDataGrid("instance");
    
    $("#EmployeesExpand").dxCheckBox({
        value: true,
        text: "Разверуть список",
        onValueChanged: function(data) {
            dataGrid.option("grouping.autoExpandAll", data.value);
        }
    });
};