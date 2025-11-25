import { IsUUID, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateReportDto {
  @IsUUID()
  @IsNotEmpty()
  cellId!: string; // Corregido: La propiedad será asignada en el runtime

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  attendanceCount!: number; // Corregido

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  newConvertsCount!: number; // Corregido

  @IsString()
  @IsOptional()
  prayerRequests!: string; // Corregido
}