import { Component,OnInit } from '@angular/core';
import { IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'angularpaypalintegration'


  private showSuccess?:boolean

  public payPalConfig?: IPayPalConfig;

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb', ///paypal hesap idniz
    createOrderOnClient: (data) => <ICreateOrderRequest>{ //istemcide order oluşturuldu
      ///ya istemci de ya da serverda order oluşturmalısınız. 
      //serverda order oluşturmak için data isimli parametre alan ve string türünde Promise döndüren bir fonksiyon tanımlayın
      intent: 'CAPTURE', //ödemeyi hemen tahsil etmek için intent: "CAPTURE" olarak ayarlanmalıdır.
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name:"PayPal Ödeme Entegrasyonu",
              quantity: '1',
              category: 'PHYSICAL_GOODS', //ürün fiziksel bir ürün ise PHYSICAL_GOODS seçilir. eğer ürün dijital bir ürün(online abonelikler vs.) olsaydı DIGITAL_GOODS yazılmalıydı.
              unit_amount: {
                currency_code: 'EUR', //burada döviz birimi belirtilir. varsayılan olarak USD'dir.
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true', //değişikliklerin kalıcı olarak kaydedilmesi için burası gereklidir.
    },
    style: {
      label: 'paypal',   //ekranda iki adet buton oluşturuldu ve bu butonun etiketi PayPal olarak atandı.
      layout: 'vertical'  //butonlar dikey olarak konumlandırıldı. (aynı sütunda 2 buton)
    },
    onApprove: (data, actions) => {
      console.log("transaction onaylandı. fakat yetkilendirme gerekiyor : ",data,actions)
      actions.order.get().then((details: any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log("client yetkilendirildiğinde burası çalışacak " ,data)
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log("ödeme iptal edildiğinde burası çalışır " ,data,actions)
    },
    onError: err => {
      console.log("hata olduğunda burası çalışacak " ,err)
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
  


}
