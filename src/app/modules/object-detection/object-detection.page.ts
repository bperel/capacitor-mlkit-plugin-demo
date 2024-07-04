import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  ProcessImageResult,
  ObjectDetection,
} from '@bperel/object-detection';
import { Capacitor } from '@capacitor/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-object-detection',
  templateUrl: './object-detection.page.html',
  styleUrls: ['./object-detection.page.scss'],
})
export class ObjectDetectionPage {
  public formGroup = new UntypedFormGroup({
    width: new UntypedFormControl(512),
    height: new UntypedFormControl(),
    confidence: new UntypedFormControl(9),
  });
  public result: ProcessImageResult | undefined;

  private readonly githubUrl =
    'https://github.com/capawesome-team/capacitor-mlkit';

  constructor(private readonly domSanitizer: DomSanitizer) {}

  public openOnGithub(): void {
    window.open(this.githubUrl, '_blank');
  }

  public pinFormatter(value: number): string {
    return `${value / 10.0}`;
  }

  public async processImage(): Promise<void> {
    const { files } = await FilePicker.pickImages({ limit: 1 });
    const path = files[0]?.path;
    if (!path) {
      return;
    }

    const width = this.formGroup.get('width')?.value;
    const height = this.formGroup.get('height')?.value;
    const confidence = this.formGroup.get('confidence')?.value;

    const result = await ObjectDetection.processImage({
      path,
      width: width,
      height: height,
      confidence: confidence / 10.0,
    });
    this.result = result;
  }

  public convertPathToWebPath(path: string): SafeUrl {
    const fileSrc = Capacitor.convertFileSrc(path);
    return this.domSanitizer.bypassSecurityTrustUrl(fileSrc);
  }
}
