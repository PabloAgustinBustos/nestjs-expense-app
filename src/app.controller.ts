import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { data, Report, ReportType } from './data';
import { v4 } from "uuid"

@Controller('report/:type')
export class AppController {
  @Get()
  getAllIncomeReports(@Param("type") type: ReportType) {
    const reports = data.report.filter(report => report.type === type)
   
    return reports;
  }

  @Get(':id')
  getReport(@Param('id') id: string, @Param("type") type: ReportType) {
    const report = data.report.find(report => report.type === type && report.id === id)

    if(!report) throw new NotFoundException();

    return report;
  }

  @Post()
  createReport(@Body() body: {amount: number, source: string}, @Param("type") type: ReportType) {
    const { source, amount } = body
    
    const newReport: Report = {
      id: v4(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type
    }

    data.report.push(newReport)

    return newReport;
  }

  @Put(':id')
  updateReport(@Body() body: {amount: number, source: string}, @Param("type") type: ReportType, @Param('id') id: string) {
    const { source, amount } = body

    const report = data.report.find(report => report.id === id && report.type === type)
    
    if(!report) throw new NotFoundException();

    if(source) report.source = source
    if(amount) report.amount = amount
    if(amount || source) report.updated_at = new Date()

    return report;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteReport(@Param("type") type: ReportType, @Param('id') id: string) {
    const deletedReport = data.report.find(report => report.id === id && report.type === type)

    if(!deletedReport) throw new NotFoundException();

    data.report = data.report.filter(report => report.id !== id)

    return
  }
}
