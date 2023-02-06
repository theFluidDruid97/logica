import DownloadIcon from '@mui/icons-material/Download'
import Button from '@mui/material/Button'
import {
  DataGridPremium,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  gridFilteredSortedRowIdsSelector,
  useGridApiContext,
} from '@mui/x-data-grid-premium'
import { jsPDF } from 'jspdf'
require('jspdf-autotable')

const DataTable = (data) => {
  const [pageSize, setPageSize] = React.useState(20)
  let exportRows = []

  const exportDataGrid = () => {
    const unit = 'pt'
    const size = 'A4'
    const orientation = 'landscape'
    const marginLeft = 40
    const title = `${data.rows[0].__typename} Report`
    const content = {
      startY: 50,
      head: [
        data.columns.map((column) =>
          column.headerName !== 'Actions' ? column.headerName : null
        ),
      ],
      body: exportRows,
    }
    const doc = new jsPDF(orientation, unit, size)
    doc.setFontSize(15)
    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    const string = doc.output('datauristring')
    const embed = "<embed width='100%' height='100%' src='" + string + "'/>"
    const x = window.open()
    x.document.open()
    x.document.write(embed)
    x.document.close()
  }

  const CustomToolbar = () => {
    const apiContext = useGridApiContext()
    const filteredRowIds = gridFilteredSortedRowIdsSelector(apiContext).filter(
      (id) => Number.isInteger(id)
    )
    let filteredRows = []
    for (let filteredRowId of filteredRowIds) {
      filteredRows.push(data.rows.find((row) => row.id === filteredRowId))
      exportRows = []
    }
    filteredRows
      .filter((row) => row !== undefined)
      .map((row) => {
        const exportRow = []
        for (const field of data.columns.map((column) => column.field)) {
          exportRow.push(row[field])
        }
        exportRows.push(exportRow)
      })

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Button size="small" onClick={() => exportDataGrid()}>
          <DownloadIcon />
          Export
        </Button>
      </GridToolbarContainer>
    )
  }

  return (
    <DataGridPremium
      rows={data.rows}
      columns={data.columns}
      pagination
      pageSize={pageSize}
      initialState={data.initialState}
      apiRef={data.apiRef}
      rowsPerPageOptions={[10, 20, 50, 100]}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      checkboxSelection
      disableSelectionOnClick
      sx={{ height: '74.5vh' }}
      components={{ Toolbar: CustomToolbar }}
      componentsProps={{
        toolbar: {
          printOptions: {
            hideToolbar: true,
            hideFooter: true,
          },
        },
      }}
    />
  )
}

export default DataTable
