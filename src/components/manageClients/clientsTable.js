import * as React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Button} from "@material-ui/core"
import { useDemoData } from '@material-ui/x-grid-data-generator';
import Check from "@material-ui/icons/Check"
import Timelapse from "@material-ui/icons/Timelapse"
import Delete from "@material-ui/icons/Delete"
import Edit from "@material-ui/icons/Edit"
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns'
import formatDate from '../../utils/formatDate';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from "react-router-dom"
import DeleteModel from "../../reUsableComponent/deleteModel"
import Select from '@material-ui/core/Select';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import * as actions from "../../store/actions"
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingLeft: 20,
  },
  formControl: {
    margin: 8,
    minWidth: 120,
  }
});

function RatingInputValue(props) {
  const [startDate,setStartDate]=React.useState(new Date())
  const classes = useStyles();
  const { item, applyValue } = props;

  const handleFilterChange = (event) => {
    setStartDate(event)
    console.log(formatDate(event))
    applyValue({ ...item, value: formatDate(event) });
  };

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={startDate}
            onChange={handleFilterChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
      </MuiPickersUtilsProvider>
    </div>
  );
}

function EndDateInputValue(props) {
  const [endData,setEndDate]=React.useState(new Date())
  const classes = useStyles();
  const { item, applyValue } = props;

  const handleFilterChange = (event) => {
    setEndDate(event)
    console.log(formatDate(event))
    applyValue({ ...item, value: formatDate(event) });
  };

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={endData}
            onChange={handleFilterChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
      </MuiPickersUtilsProvider>
    </div>
  );
}

function StatusInputValue(props) {
  const classes = useStyles();
  const [status,setStatus]=React.useState("")
  const { item, applyValue } = props;

  const handleFilterChange = (event) => {
    setStatus(event.target.value)
    applyValue({ ...item, value: event.target.value});
  };

  return (
    <div className={classes.root}>
    <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          native
          value={status}
          onChange={handleFilterChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"complete"}>Complete</option>
          <option value={"pending"}>Pending</option>
        </Select>
      </FormControl>
    </div>
  );
}


RatingInputValue.propTypes = {
  applyValue: PropTypes.func.isRequired,
  item: PropTypes.shape({
    columnField: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    operatorValue: PropTypes.string,
    value: PropTypes.any,
  }).isRequired,
};
EndDateInputValue.propTypes = {
  applyValue: PropTypes.func.isRequired,
  item: PropTypes.shape({
    columnField: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    operatorValue: PropTypes.string,
    value: PropTypes.any,
  }).isRequired,
};
StatusInputValue.propTypes = {
  applyValue: PropTypes.func.isRequired,
  item: PropTypes.shape({
    columnField: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    operatorValue: PropTypes.string,
    value: PropTypes.any,
  }).isRequired,
};

const ratingOnlyOperators = [
  {
    label: 'Select',
    value: 'from',
    getApplyFilterFn: (filterItem) => {
      if (
        !filterItem.columnField ||
        !filterItem.value ||
        !filterItem.operatorValue
      ) {
        return null;
      }

      return (params) => {
        return params.value == filterItem.value
      };
    },
    InputComponent: RatingInputValue,
    InputComponentProps: { type: 'number' },
  },
];


const endDateOnlyOperators = [
  {
    label: 'Select',
    value: 'from',
    getApplyFilterFn: (filterItem) => {
      if (
        !filterItem.columnField ||
        !filterItem.value ||
        !filterItem.operatorValue
      ) {
        return null;
      }

      return (params) => {
        return params.value == filterItem.value
      };
    },
    InputComponent: EndDateInputValue,
    InputComponentProps: { type: 'number' },
  },
];

const statusOnlyOperators = [
  {
    label: 'Select',
    value: 'from',
    getApplyFilterFn: (filterItem) => {
      if (
        !filterItem.columnField ||
        !filterItem.value ||
        !filterItem.operatorValue
      ) {
        return null;
      }

      return (params) => {
        return params.value == filterItem.value
      };
    },
    InputComponent: StatusInputValue,
    InputComponentProps: { type: 'number' },
  },
];


function BasicFilteringGrid({header,data,deleteClient,reload}) {
    const history=useHistory();
    const [delModal,setDelModal]=React.useState(false)
  const [pageSize, setPageSize] = React.useState(5);
  const [clientId, setClientId] = React.useState("");
  const [profileId, setProfileId] = React.useState("");
  const [filterModel, setFilterModel] = React.useState({
    items: [
      { columnField: 'startDate', value: '', operatorValue: 'from' }
    ],
  });
  const {c1,c2,c3,c4,c5}=header
  const columns=[
    {
      field:c1.key,
      minWidth:200,
      headerName:c1.title,
      headerClassName: 'super-app-theme--header',
      flex:1
    },
    {
      field:c2.key,
      headerName:c2.title,
      minWidth:150,
      headerClassName: 'super-app-theme--header',
      flex:1
    },
    // {
    //   field:c5.key,
    //   minWidth: 130 ,
    //   flex:0.5,
    //   headerName:c5.title,
    //   headerClassName: 'super-app-theme--header',
    //   renderCell: (params) =>{
    //     if(params.value=="pending"){
    //       return(
    //         <p style={{textTransform:'capitalize',color:'#F5AF3C'}}>
    //         <Timelapse
    //         style={{color:'#F5AF3C',marginRight:5}}
    //         fontSize="small"
    //         />
    //         {(params.value)}
    //       </p>
    //       )
    //     }else{
    //       return(
    //         <p style={{textTransform:'capitalize',color:'#3ADE59'}}>
    //           <Check
    //           style={{color:'#3ADE59',marginRight:5}}
    //           fontSize="small"
    //           />
    //           {(params.value)}
    //         </p>
    //       )
    //     }
    //   },
    // },
    {
      field:c3.key,
      flex:1,
      id:"1",
      minWidth: 100 ,
      renderCell:(params)=><p style={{color:'grey'}}>{params.value}</p>,
      headerClassName: 'super-app-theme--header',
      headerName:c3.title
    },
    {
      field:c4.key,
      flex:1,
      id:"2",
      minWidth: 100 ,
      renderCell:(params)=><p style={{color:'grey'}}>{params.value}</p>,
      headerClassName: 'super-app-theme--header',
      headerName:c4.title
    },
    {
      field:'id',
      filterable:false,
      flex:1,
      headerAlign:'center',
      sortable:false,
      renderCell:(params)=>{
        return(
          <div style={{marginLeft:'auto',marginRight:'auto'}}>
            <Button
            onClick={()=>history.push(`/clientDetails/${params.value}`)}
            style={{color:'#5055be',borderColor:'#5055be',marginLeft:5}}
            variant="outlined"
            >
              View Detail
            </Button>
          </div>
        )
      },
      minWidth: 200 ,
      headerName:'Detail',
      headerClassName: 'super-app-theme--header',
    },
    {
      field:'action',
      flex:1,
      filterable:false,
      headerAlign:'center',
      sortable:false,
      renderCell:(params)=>{
        return(
          <div style={{marginLeft:'auto',marginRight:'auto'}}>
            <Button
            onClick={()=>history.push(`/updateClient/${params.value._id}`)}
            style={{color:'#3ADE59',borderColor:'#3ADE59',marginRight:5}}
            variant="outlined"
            >
              <Edit
              fontSize="small"
              />
            </Button>
            <Button
            onClick={()=>{
                setClientId(params.value._id)
                setProfileId(params.value.customerProfileId)
                setDelModal(true)
            }}
            style={{color:'red',borderColor:'red',marginLeft:5}}
            variant="outlined"
            >
              <Delete
              fontSize="small"
              />
            </Button>
          </div>
        )
      },
      minWidth: 200 ,
      headerName:'Action',
      headerClassName: 'super-app-theme--header',
    }
  ]

if (columns.length > 0) {
  // startDate
  const ratingColumn = columns.find((col) => col.field === 'startDate');
  const newRatingColumn = {
    ...ratingColumn,
    filterOperators: ratingOnlyOperators,
  };

  const ratingColIndex = columns.findIndex((col) => col.field === 'startDate');
  columns[ratingColIndex] = newRatingColumn;
// enddate
  const endDateColumn = columns.find((col) => col.field === 'endDate');
  const newendDateColumn = {
    ...endDateColumn,
    filterOperators: endDateOnlyOperators,
  };

  const endDateColIndex = columns.findIndex((col) => col.field === 'endDate');
  columns[endDateColIndex] = newendDateColumn;

//status
  const statusColumn = columns.find((col) => col.field === 'status');
  const newstatusColumn = {
    ...statusColumn,
    filterOperators: statusOnlyOperators,
  };

  const statusColIndex = columns.findIndex((col) => col.field === 'status');
  columns[statusColIndex] = newstatusColumn;
}


function onDeleteClient(clientId){
    deleteClient(clientId,profileId).then((res)=>{
        reload()
        if(res.status){
          toast.success("successfully deleted")
        }else{
          toast.error(res.msg)
        }
    })
}

const [page, setPage] = React.useState(1);
const [loader, setLoader] = React.useState(false);

React.useEffect(()=>{
  setLoader(true)
  reload(page).then(()=>setLoader(false))
},[page])


  return (
    <div style={{ height: 600, width: '100%',marginTop:20 }}>
        <DeleteModel
			visible={delModal}
			closeModal={()=>setDelModal(false)}
			action={()=>onDeleteClient(clientId)}
			title="Are you want to delete this client?"
			/>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        columns={columns}
        rows={data.docs.map(item=>({
          orgName:item.organization,
          noOfProjects:item.projects?.toString(),
          // status:"pending",
          noOfPackages:item.subs?.toString(),
          name:item.first_name+" "+item.last_name,
          id:item._id,
          action:item
        }))}

        rowCount={data.totalDocs}
        pageSize={10}
        onPageChange={(newPage) => {
          setPage(newPage+1)
        }}
        rowsPerPageOptions={[10]}
        pagination
        paginationMode="server"
        filterModel={filterModel}
        onFilterModelChange={(model) => setFilterModel(model)}
        loading={loader}
      />
      <ToastContainer/>
    </div>
  );
}

export default connect(null,actions)(BasicFilteringGrid)