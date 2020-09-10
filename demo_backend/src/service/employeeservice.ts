
import { Connection } from 'typeorm';

import { Employee } from "../entity/employee"
import { createConnection, getConnection } from "typeorm";

export class EmployeeService {

    async createEmployee(employee): Promise<Employee> {

        const connection: Connection = await getConnection()
        // await this.dbhelper.closeConnection()
        const inserted = await connection.getRepository(Employee).save(employee);
        if (inserted) {
            return inserted;
        }
        return inserted;
    }
    async getEmployee(): Promise<Employee[]> {

        const connection: Connection = await getConnection()
        const employees = await connection.getRepository(Employee).find()
        return employees;

    }
    async getEmployeeByEmail(email): Promise<Employee[]> {
        const connection: Connection = await getConnection()
        const employees = await connection.getRepository(Employee).find({ email: email })
        return employees;
    }
}