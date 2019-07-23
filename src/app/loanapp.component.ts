import { Component } from '@angular/core';
import  {Term} from './term';

@Component({
  selector: 'loan-app',
  templateUrl: './loanapp.component.html',
  styleUrls: [ './loanapp.component.css' ]
})
export class LoanAppComponent  {
  name = 'Angular';
  public amount: number = 250000;
  years: number = 5;
  months: number = 0;
  interest: number = 2.1;
  gebyr: number = 50;
  monthlyPayment: number = 0;
  paymentPlan: Term[] =  [];
  terminBelopEtterSkatt: number = 0;


  public ngOnInit()
  {
    console.log('ngoninit run');
  }

 
 calculateMonthlyPayment() {
   
        var monthlyPayment = 0;
        var monthlyInterest = this.interest / 1200;
        var exponent = (-1 * this.years * 12);
        var annuityFactor = 1 - Math.pow((1 + monthlyInterest), exponent); //annuitetsfakter på norsk
        this.monthlyPayment = this.amount * ( monthlyInterest / annuityFactor);
        console.log(`Amount: ${this.amount}`);
        console.log(`Interest: ${this.interest}`);
        console.log(`Years: ${this.years}`);
        console.log(`montly: ${this.monthlyPayment}`);
    };
  calculate() {
    console.log(`Starter beregning`);
        this.paymentPlan = [];
        //til beregning
        let antallTerminer = this.years * 12;
        let terminBeloep = 0;
        let terminRente = 0;
        let terminAvdrag = 0;
        let restgjeld = this.amount;
        let output = "";

        terminBeloep = this.getMonthlyPayment(restgjeld, this.interest, this.years);
        this.monthlyPayment = terminBeloep;
        for (var i = 0; i < antallTerminer; i++) {
            let term = new Term();
            term.nr = i + 1;
            term.rente = this.getMonthlyInterestAmount(restgjeld, this.interest);
            term.avdrag = this.getMonthlyDownpayment(terminBeloep, term.rente);
            term.terminBelopEtterSkatt = terminBeloep - (term.rente * 0.28);
            //setter restgjeld som er grunnlag for neste iterasjon
            restgjeld = restgjeld * 1 - term.avdrag * 1;
            term.restgjeld = restgjeld;
            this.paymentPlan.push(term);
        }
    }

    getMonthlyPayment(restgjeld, rentesats, antallAar) {
        var monthlyPayment = 0;
        var monthlyInterest = rentesats / 1200;
        var exponent = (-1 * antallAar * 12);
        var annuityFactor = 1 - Math.pow((1 + monthlyInterest), exponent); //annuitetsfaktor på norsk
        monthlyPayment = restgjeld * ( monthlyInterest / annuityFactor);
        return monthlyPayment;
    }

    getMonthlyDownpayment(monthlyPayment, monthlyInterest) {
        //alert("Månedlig nedbetaling: " + (monthlyPayment - monthlyInterest * 1));
        return monthlyPayment - monthlyInterest;
    }

    getMonthlyInterestAmount(restgjeld, rentesats) {
        var renter = 0;
        var monthlyInterest = rentesats / 1200;
        renter = restgjeld * monthlyInterest;
        //alert("Månedlig rente: " + renter);
        return renter;
    }

}