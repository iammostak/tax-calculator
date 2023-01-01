# tax-calculator

A tax calculator component that calculates the tax on the provided principal value based on some speciﬁc business rules.


## *Workflow* :
> - User can upload csv files with filename `invoice.csv`
> - Application will read data from uploaded file and confirm if the data is in given format.
> - If it is in given format then tax will be calculated from principle values based on specific business rules.
> - Result will be written in a new file `result.csv` and will be made available to users for downloading.
> - Also there is a data table with pre written principle values for users to see how this application works.
> - User can click on calculate button on each row in table to get the calculated tax and tax rate below the table.

## *TechStack & Tools* :
![React](	https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAF)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Chakra UI](https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

## *Deployed link* :
> <a href='https://tax-calculator-omega.netlify.app' target='_blank'>https://tax-calculator-omega.netlify.app</a>

## *Screenshots* :
<img width="960" alt="data-table" src="https://user-images.githubusercontent.com/99809028/210181286-c04067ef-2348-4eea-844e-6a49c7fd2ba8.png">
<img width="960" alt="upload-csv" src="https://user-images.githubusercontent.com/99809028/210181324-928c2f2e-ac82-4400-9ad3-d056e28ee8c2.png">


## *To run in local system* :

### `git clone https://github.com/iammostak/tax-calculator.git`

This command will make a clone of this repository in your local system.\
Copy pase this in your terminal and press `Enter`, it will be asking for a dircetory, select one and now cloning is done.\
And now follow the below steps to run the application. 

### `npm i`

This command downloads all the dependencies and development dependencies required for the application to run properly.\
This project was bootstrapped with [Vite](https://vitejs.dev/).

## Available Scripts :

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser (If port 5173 is already occupied then it runs on other port).

### `npm run test`

Launches the test runner in the interactive watch mode.\
I am using `jest, testing-library/react and vitest` for testing purposes.
Testing environment is `jest-environment-dom`.
