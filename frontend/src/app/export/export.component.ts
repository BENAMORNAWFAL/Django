import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ParagraphService } from '../service'



@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {
  annotations: any[] = [];
  documents: any[] = [];
  jsonData: string = '';
  json: string = '';


  constructor(private ParagraphService: ParagraphService) { }

  ngOnInit(): void {
    this.ParagraphService.getAnnotations().subscribe((annotations: any) => {
      this.annotations = annotations;
      const documentObservables = [];
      const documentObservable = {}
      for (let annotation of this.annotations) {
        console.log("Checking document ID:", annotation.document);
        const documentId = annotation.document;
        const existingDocument = this.documents.find((doc) => doc.id === documentId);

        if (!existingDocument) {
          // Create an observable for fetching the document
          const documentObservable = this.ParagraphService.getDocumentById(documentId);

          // Push the observable to the list
          documentObservables.push(documentObservable);

        }
      }

      // Use forkJoin to wait for all document requests to complete
      forkJoin(documentObservables).subscribe((documentResponses: any[]) => {
        documentResponses.forEach((documentResponse) => {
          const existingDocumentIndex = this.documents.findIndex((doc) => doc.text === documentResponse.text);

          if (existingDocumentIndex !== -1) {

            // Update annotations for the existing document
            const existingDocument = this.documents[existingDocumentIndex];
          } else {
            // Add a new document with its annotations
            this.documents.push({
              text: documentResponse.text,
              annotations: this.annotations.map((annotation) => ({
                start: annotation.start,
                end: annotation.end,
                label: annotation.label,
                text: annotation.text_selected,
              })),
            });
          }
        });


        const combinedData = {
          document: this.documents.map((doc) => doc.text),
          annotations: this.documents
            .map((doc) => doc.annotations)
            .reduce((acc, val) => acc.concat(val), []), // Flatten the annotations array
        };

        this.json = JSON.stringify(combinedData);
      });


    });

  }

  download() {
    // Create a Blob with the JSON data
    const blob = new Blob([this.json], { type: 'application/json' });

    // Create an object URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported-data.json';
    a.click();
    this.jsonData = this.json;
    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
    console.log("zzzzzzzzzzzzz 1:28AM", this.documents);
    (error: any) => {
      console.error('Error fetching documents:', error);
    };
  }


}
