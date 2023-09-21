import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllIncomeReports() {
    console.log('all resports');
    return [];
  }

  @Get(':id')
  getReport(@Param('id') id: string) {
    console.log('report', id);

    return [];
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
