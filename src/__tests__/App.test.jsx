import { cleanup, fireEvent, render } from "@testing-library/react";
import ContentTitle from "../components/ContentTitle";
import DataTable from "../routes/DataTable";
import { invoices } from "../db.json";
import App from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";
import ImportCSV from "../routes/ImportCSV";

afterEach(cleanup);

test("routes are working correctly", () => {
   const { getByTestId } = render(
      <BrowserRouter>
         <App />
      </BrowserRouter>
   );

   const home = getByTestId("home");
   const upload = getByTestId("upload");

   fireEvent.click(home);
   setTimeout(() => {
      expect(getByTestId("data-table")).toBeInTheDocument();
      fireEvent.click(upload);
   }, 1000);

   setTimeout(() => {
      expect(getByTestId("upload-csv")).toBeInTheDocument();
   }, 1000);
});

test("content title appends correctly", () => {
   const { getByTestId } = render(<ContentTitle>Title</ContentTitle>);

   expect(getByTestId("title")).toHaveTextContent("Title");
});

test("table should render correctly", () => {
   const { getByTestId, getAllByTestId } = render(<DataTable />);

   expect(getByTestId("table")).toBeInTheDocument();
   expect(getAllByTestId("table-header")).toHaveLength(4);
});

test("table row count correct", () => {
   const { getAllByTestId } = render(<DataTable />);

   expect(getAllByTestId("table-row")).toHaveLength(invoices.length);
});

test("tax calculate correctly", () => {
   const { getByTestId, getAllByTestId } = render(<DataTable />);

   let tax_rates = { 0: 5, 1: 8, 2: 12 };
   const button = getAllByTestId("tax-cal-btn");
   const tax = getByTestId("tax-value");
   const tax_rate = getByTestId("tax-rate");

   let data = invoices.filter((item) => item.item_type <= 2);

   button.forEach((item, index) => {
      fireEvent.click(item);

      let amount = data[index].amount,
         item_type = data[index].item_type;

      let cal_tax = amount * (tax_rates[item_type] / 100);

      expect(tax).toHaveTextContent(`₹${cal_tax.toFixed(2)}`);
      expect(tax_rate).toHaveTextContent(
         `(Tax Rate : ${tax_rates[item_type]}%)`
      );
   });
});

test("conditional rendering working correctly in csv page", () => {
   const { getByTestId } = render(<ImportCSV />);

   const input_file = getByTestId("input-file");
   const upload_btn = getByTestId("upload-btn");

   const content = `
      s.no, amount, item_type\r 
      1, 1200, 0\r
      2, 25000, 1\r
      3, 35545, 2\r
      4, 1500, 1\r
      5, 23456, 3
   `;

   let blob = new Blob([content], { type: "text/csv" });
   let file = new File([blob], "invoice.csv", { type: "text/csv" });

   fireEvent.change(input_file, { target: { files: [file] } });

   fireEvent.click(upload_btn);

   setTimeout(() => {
      const calculate_btn = getByTestId("calculate-btn");
      expect(calculate_btn).toBeInTheDocument();
      fireEvent.click(calculate_btn);
   }, 1000);

   setTimeout(() => {
      const download_form = getByTestId("download-form");
      expect(download_form).toBeInTheDocument();
   }, 1000);
});
