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
import { jsPDF as JsPDF } from 'jspdf'
require('jspdf-autotable')

const DataTable = ({
  rowHeight,
  rows,
  columns,
  initialState,
  apiRef,
  GridToolbarAddButton,
  GridToolbarDeleteButton,
  GridToolbarCustomButton,
}) => {
  const defaultSort = columns[0].field
  const [sortModel, setSortModel] = React.useState([
    {
      field: `${defaultSort}`,
      sort: 'desc',
    },
  ])
  const [pageSize, setPageSize] = React.useState(20)
  const [selection, setSelection] = React.useState()
  let exportRows = []

  const exportDataGrid = () => {
    const unit = 'pt'
    const size = 'A4'
    const orientation = 'landscape'
    const marginLeft = 40
    const title = `${rows[0].__typename} Report`
    const content = {
      startY: 50,
      head: [
        columns.map((column) =>
          column.headerName !== 'Actions' ? column.headerName : null
        ),
      ],
      body: exportRows,
    }
    const doc = new JsPDF(orientation, unit, size)
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
      filteredRows.push(rows.find((row) => row.id === filteredRowId))
      exportRows = []
    }
    filteredRows
      .filter((row) => row !== undefined)
      .map((row) => {
        const exportRow = []
        for (const field of columns.map((column) => column.field)) {
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
        {GridToolbarCustomButton ? (
          <GridToolbarCustomButton selection={selection} />
        ) : (
          <></>
        )}
        {GridToolbarAddButton ? <GridToolbarAddButton /> : <></>}
        {GridToolbarDeleteButton ? (
          <GridToolbarDeleteButton selection={selection} />
        ) : (
          <></>
        )}
      </GridToolbarContainer>
    )
  }

  return (
    <DataGridPremium
      rowHeight={rowHeight || 50}
      rows={rows}
      columns={columns}
      pagination
      pageSize={pageSize}
      initialState={initialState}
      apiRef={apiRef}
      rowsPerPageOptions={[10, 20, 50, 100]}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      checkboxSelection
      disableSelectionOnClick
      sortModel={sortModel}
      onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
      onSelectionModelChange={(selectionIds) => {
        setSelection(
          rows.filter(
            (row) =>
              row.id ===
              selectionIds.find((selectionId) => selectionId === row.id)
          )
        )
      }}
      sx={{ height: '89vh' }}
      components={{ Toolbar: CustomToolbar }}
    />
  )
}

export default DataTable

// <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//   <Grid item xs={6}>
//     <Item>1</Item>
//   </Grid>
//   <Grid item xs={6}>
//     <Item>2</Item>
//   </Grid>
//   <Grid item xs={6}>
//     <Item>3</Item>
//   </Grid>
//   <Grid item xs={6}>
//     <Item>4</Item>
//   </Grid>
//  </Grid>
