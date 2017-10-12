import { Component, OnInit } from '@angular/core';
declare var google: any;


declare var jquery:any;
declare var $ :any;

import loadTouchEvents from 'jquery-touch-events';

loadTouchEvents($);

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  
  stateHover: string = ''

  constructor() { }

  ngOnInit() {
	var self = this;
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
 	
            $('#selectParamsModal').modal({
                 backdrop: 'static',
                 keyboard: false 
            });
        $('#selectParamsModal').modal('show');

           $( window ).resize(function() {
            $('#usa').css('height', $(window).height() + 'px');
           $('#usa').css('width',  $(window).width() + 'px');

          $('#selectParamsModal').css('padding', 0);
          $('#selectParamsModal').css('margin', 0);

             if($(window).height() < $(window).width()){
                $(this).css('height', $(window).height() + 'px');
                $(this).css('width', 'auto');
            }else{
                $(this).css('width', $(window).width() + 'px');
                $(this).css('height', 'auto');
            }
        });


            $('#usa').on('load',  function() {

	        console.log('image load');
		     console.log($(this).width());
		    console.log($(window).height());
                 console.log($(window).width());
        		if($(window).height() < $(window).width()){
                $(this).css('height', $(window).height() + 'px');
                $(this).css('width', 'auto');
            }else{
                $(this).css('width', $(window).width() + 'px');
                $(this).css('height', 'auto');
            }
          
         
         });


        $('#usa').tapstart(function(e, touch) {

                 console.log('Touch Start'); 
                  console.log(e);

         });


         $('#usa').tapmove(function(e, touch) {

                 console.log('touch move'); 
                  console.log(e);
		console.log(self);
                self.stateHover = "assets/usa/california.png";

		console.log(this.stateHover);

         });


         $('#usa').tapend(function(e, touch) {

                 console.log('Touch End'); 
                  console.log(e);
                $('#selectParamsModal').modal('hide');


         });


  }

 	resetParams(){
             $('#selectParamsModal').modal('show');
        }
	

}
