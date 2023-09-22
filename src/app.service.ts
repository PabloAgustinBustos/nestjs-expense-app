import { Injectable } from '@nestjs/common';
import { data, Report, ReportType } from './data';
import { v4 } from "uuid"

@Injectable()
export class AppService {
  getAllReports(type: string){
    const reports = data.report.filter(report => report.type === type)

    return reports
  }

  getReport(id: string, type: string){
    const report = data.report.find(report => report.type === type && report.id === id)

    return report
  }

  createReport(source: string, amount: number, type: ReportType){
    const newReport: Report = {
      id: v4(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type
    }

    data.report.push(newReport)

    return newReport
  }

  updateReport(report: Report, source: string, amount: number){
    if(source) report.source = source
    if(amount) report.amount = amount
    report.updated_at = new Date()
  }

  deleteReport(id: string){
    data.report = data.report.filter(report => report.id !== id)
  }
}
