import React, { useEffect, useState } from "react";
import CommonPageLayout from "../../components/CommonPageLayout";
import { Grid, Card } from "@mui/material";
import {
  Edit as EditIcon,
  Message as MessageIcon,
  Preview as PreviewIcon,
} from "@mui/icons-material";
import PrintIcon from "@mui/icons-material/Print";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DropdownButton from "../../components/DropDownButton";
import IROServices from "./extras/IROServices";

const IRODashboard = () => {
  const [IROrder, setIROrder] = useState<IROrder[]>();
  useEffect(() => {
    IROServices.getAll()
      .then((res) => {
        console.log(res);
        setIROrder(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const columns = [
    {
      field: "_manage",
      headerName: "Action",
      minWidth: 50,
      type: "string",
      renderCell: (props: any) => (
        <DropdownButton
          useIconButton={true}
          id="IRO action"
          primaryText="Actions"
          key={"IRO action"}
          items={[
            {
              id: "View",
              text: "Release Amount",
              component: Link,
              to: "/iro/release_amount/" + props.row._id,
              icon: PreviewIcon,
            },
            {
              id: "remarks",
              text: "Remarks",
              icon: EditIcon,
            },
            {
              id: "print",
              text: "Print IRO",
              icon: PrintIcon,
            },
            {
              id: "View",
              text: "View Details ",
              component: Link,
              to: `/fr/${props.row._id}/view`,
              icon: PreviewIcon,
            },
          ]}
        />
      ),
    },
    { field: "_id", headerName: "SI No", width: 70 },
    { field: "IROno", headerName: "IRO No", width: 70 },
    { field: "IROdate", headerName: "IRO Date", width: 130 },
    { field: "divisionName", headerName: "Division Name", width: 150 },
    { field: "subdivisionName", headerName: "Sub Division Name", width: 170 },
    { field: "mainCategory", headerName: "Main Category", width: 150 },
    { field: "requestAmount", headerName: "Requested Amount", width: 130 },
    { field: "lastUpdateDate", headerName: "Last Updated", width: 130 },
    { field: "sanction", headerName: "Special Sanction", width: 130 },
  ];
  return (
    <CommonPageLayout title="Internal Release Order">
      <br />
      <br />
      <Grid item xs={12} md={12}>
        <Card style={{ height: "75vh", width: "100%" }}>
          <DataGrid
            rows={IROrder ?? []}
            columns={columns}
            getRowId={(row) => row._id}
          />
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default IRODashboard;
