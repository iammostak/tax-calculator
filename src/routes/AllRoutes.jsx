import { Route, Routes } from "react-router-dom";
import ImportCSV from "./ImportCSV";
import DataTable from "./DataTable";

function AllRoutes() {
   return (
      <Routes>
         <Route path="/" element={<DataTable />} />
         <Route path="/uploadcsv" element={<ImportCSV />} />
      </Routes>
   );
}

export default AllRoutes;
