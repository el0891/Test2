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
                dataField: "DepartmentId",
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
        ],
        onRowClick: function(e) {
            if(e.rowType === "data") {
                EmpId = dataGrid.cellValue(e.rowIndex, "EmployeeId");
                $("input#NameTxt").val(dataGrid.cellValue(e.rowIndex, "EmployeeName"));
                $("input#SalaryTxt").val(dataGrid.cellValue(e.rowIndex, "EmployeeSalary"));
                $("input#DepTxt").val(dataGrid.cellValue(e.rowIndex, "DepartmentId"));
            }
        }
    }).dxDataGrid("instance");
    
    $("#EmployeesExpand").dxCheckBox({
        value: true,
        text: "Разверуть список",
        onValueChanged: function(data) {
            dataGrid.option("grouping.autoExpandAll", data.value);
        }
    });
};