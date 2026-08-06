import { LightningElement } from 'lwc';

export default class ForEachLoop extends LightningElement {

    employee ={
        fName : 'Ayan',
        lName : 'Sam',
        age : 22,
        city : 'Kolkata'
    }

    employeeList = [
        {
        fName : 'Ayan',
        lName : 'Sam',
        age : 22,
        city : 'Kolkata'
        },
        {
        fName : 'John',
        lName : 'Doe',
        age : 25,
        city : 'New York'
        },
        {
        fName : 'Ellis',
        lName : 'Peter',
        age : 22,
        city : 'Pubjab'
        }
    ]

}