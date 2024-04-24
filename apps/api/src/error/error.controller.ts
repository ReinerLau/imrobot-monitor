import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CodeService } from './code.service';
import {
  CreateCodeDto,
  CreateRequestDto,
  CreateResourceDto,
} from './model/error.dto';
import { RequestService } from './request.service';
import { ResourceService } from './resource.service';
import { SourceService } from './source.service';

@Controller('error')
export class ErrorController {
  constructor(
    private codeService: CodeService,
    private sourceService: SourceService,
    private resourceService: ResourceService,
    private requestService: RequestService,
  ) {}

  @Get('code')
  findAllCode(
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ) {
    return this.codeService.findAll(startTime, endTime);
  }

  @Post('code')
  createOneCode(@Body() dto: CreateCodeDto) {
    return this.codeService.createOne(dto);
  }

  @Get('getMap')
  findMap(@Query('fileName') fileName: string) {
    return this.sourceService.findMap(fileName);
  }

  @Get('resource')
  findAllResource(
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ) {
    return this.resourceService.findAll(startTime, endTime);
  }

  @Post('resource')
  createOneResource(@Body() dto: CreateResourceDto) {
    return this.resourceService.createOne(dto);
  }

  @Get('request')
  findAllRequest(
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ) {
    return this.requestService.findAll(startTime, endTime);
  }

  @Post('request')
  createOneRequest(@Body() dto: CreateRequestDto) {
    return this.requestService.createOne(dto);
  }
}
