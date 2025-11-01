import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { FormDefinition } from './entities/form-definition.entity';
import { FormVersion } from './entities/form-version.entity';
import { FormFieldLibrary } from './entities/form-field-library.entity';
import { FormSubmission } from './entities/form-submission.entity';
import { FormAction } from './entities/form-action.entity';

// Services
import { FormSubmissionService } from './services/form-submission.service';
import { FormExportService } from './services/form-export.service';

// Controllers
import { FormSubmissionController } from './controllers/form-submission.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FormDefinition,
      FormVersion,
      FormFieldLibrary,
      FormSubmission,
      FormAction,
    ]),
  ],
  controllers: [FormSubmissionController],
  providers: [FormSubmissionService, FormExportService],
  exports: [TypeOrmModule, FormSubmissionService, FormExportService],
})
export class FormBuilderModule {}
