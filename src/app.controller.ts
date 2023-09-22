import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private service: AppService) {}

  @Get()
  getAllReports(@Param("type") type: ReportType) {
    const reports = this.service.getAllReports(type)
   
    return reports;
  }

  @Get(':id')
  getReport(@Param('id') id: string, @Param("type") type: ReportType) {
    const report = this.service.getReport(id, type)

    if(!report) throw new NotFoundException();

    return report;
  }

  @Post()
  createReport(@Body() body: {amount: number, source: string}, @Param("type") type: ReportType) {
    const { source, amount } = body
    
    const newReport = this.service.createReport(source, amount, type)

    return newReport;
  }

  @Put(':id')
  updateReport(@Body() body: {amount: number, source: string}, @Param("type") type: ReportType, @Param('id') id: string) {
    const { source, amount } = body

    const report = this.service.getReport(id, type)
    
    if(!report) throw new NotFoundException();
    if(source || amount) this.service.updateReport(report, source, amount)
    
    return report;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteReport(@Param("type") type: ReportType, @Param('id') id: string) {
    const deletedReport = this.service.getReport(id, type)

    if(!deletedReport) throw new NotFoundException();

    this.service.deleteReport(id)

    return
  }
}
