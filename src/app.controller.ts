import { Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { data, ReportType } from './data';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllIncomeReports(@Param("type") type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE

    const reports = data.report.filter(report => report.type === reportType)
   
    return reports;
  }

  @Get(':id')
  getReport(@Param('id') id: string, @Param("type") type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE

    const report = data.report.find(report => report.type === reportType && report.id === id)

    if(!report) throw new NotFoundException();

    return report;
  }

  @Post()
  createReport() {
    return {};
  }

  @Put(':id')
  updateReport(@Param('id') id: string) {
    console.log('resport', id);

    return {};
  }

  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    console.log('resport', id);

    return {};
  }
}
