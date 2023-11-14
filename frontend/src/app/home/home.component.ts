import { Component, ElementRef, ViewChild,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ParagraphService } from '../service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  paragraph: string = ''; // Initialize it with an empty string
  result: any;
  newLabel: string = ''; // Added a new variable for the input field
  labelList: string[] = [];
  newparagraph: String = '';
  labelClasses: string[] = ['label-color-1', 'label-color-2', 'label-color-3', 'label-color-4']; // Define the CSS classes
  selectedLabel: string | null = null;
  selectionStart: number = 0;
  selectionEnd: number = 0;
  selections: { label: string, start: number, end: number }[] = []



  constructor(private paragraphService: ParagraphService, private httpClient: HttpClient ) { }
  @ViewChild('newparagraphElement', { static: true }) newparagraphElement!: ElementRef<any>;


  processParagraph() {
    this.newparagraph = this.paragraph;
    content: this.newparagraph;
  }

  addLabel() {
    if (this.newLabel) {
      this.labelList.push(this.newLabel);
      this.newLabel = ''; // Clear the input field after adding the label
    }
  }

  //select label
  onSelectLabel(label: string) {
    this.selectedLabel = label;
  }


  //select text from paragraph
  onParagraphSelect(event: MouseEvent) {
    const divElement = this.newparagraphElement.nativeElement;
    if (divElement) {
      const selectedText = window.getSelection()?.toString();
      if (selectedText) {
        this.selectionStart = divElement.textContent.indexOf(selectedText);
        this.selectionEnd = this.selectionStart + selectedText.length;
      }
    }
    const selection: { label: string, start: number, end: number } = {
      label: this.selectedLabel || '',
      start: this.selectionStart,
      end: this.selectionEnd
    };

    this.selections.push(selection);
    
  }

  // register the document and annotations in database
  registerdocument() {
    const paragraphData = {
      text: this.newparagraph
    };


    this.paragraphService.createParagraph(paragraphData).subscribe(
      (response: any) => {
        // Handle the successful response from the Django API
        console.log('Paragraph registered successfully:', response);
        
        
        this.result = response.id; // get the id document from response
        console.log("**********============",response.id)
      },
      (error: any) => {
        //  if error
        console.error('Error registering paragraph:', error);
      }

    );


  }


  registerAnnotations() {
    const selectionData = {
      document : this.result,
      label: this.selectedLabel,
      start: this.selectionStart,
      end: this.selectionEnd,
      text_selected: this.paragraph.substring(this.selectionStart, this.selectionEnd)
    };
    
    this.paragraphService.createSelection(selectionData).subscribe((response) => {
      
        // Handle the successful response from the Django API
        console.log('Paragraph registered successfully:', response);
        
        
      },
        (error: any) => {
          //  if error
          console.error('Error registering paragraph:', error);
        }
    );
  }
  
}
