import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { FormDefinition } from './entities/form-definition.entity';
import { FormVersion } from './entities/form-version.entity';
import { FormFieldLibrary } from './entities/form-field-library.entity';
import { FormSubmission } from './entities/form-submission.entity';
import { FormAction } from './entities/form-action.entity';

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
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class FormBuilderModule {}
