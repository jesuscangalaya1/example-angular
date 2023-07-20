import { Injectable } from '@angular/core';
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public question(
    {
      tittle,
      subTitle,
      showConfirmButton,
      showCancelButton,
      btnConfirmText,
      btnCancelText,
      image = 'assets/images/g1.png'
    }: {
      tittle: string,
      subTitle: string,
      showConfirmButton: boolean,
      showCancelButton: boolean,
      btnConfirmText: string,
      btnCancelText: string,
      image?: string
    }
  ): Promise<any> {
    return new Promise((resolve) => {
      const swalPersonalizado = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-confirmation mr-2',
          cancelButton: 'btn btn-cancel',

          container: 'custom-swal-container',
          title: 'custom-swal-title',
          image: 'custom-swal-image',
        },
        buttonsStyling: false,
      });
      swalPersonalizado
        .fire({
          html: tittle,
          imageUrl: image,
          text: `<p>${subTitle}.</p> `,
          showConfirmButton: showConfirmButton,
          showCloseButton: false,
          showCancelButton: showCancelButton,
          focusConfirm: true,
          confirmButtonText: btnConfirmText,
          cancelButtonText: btnCancelText,
          allowOutsideClick: false,
          allowEscapeKey: false,
          width: 400,
        })
        .then((result) => {
          console.log(result);
          if (result.isConfirmed) {
            resolve(true);
          } else if (
            result.dismiss === Swal.DismissReason.cancel ||
            result.dismiss === Swal.DismissReason.close
          ) {
            resolve(false);
          }
        });
    });
  }



  public notification(title: string, icon: any = 'success') {
    const swalPersonalizado = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-confirmation',
      },
      buttonsStyling: false,
    });
    swalPersonalizado.fire({
      position: 'center',
      icon: icon,
      title: title,
      showConfirmButton: true,
    });
  }


  public close(): void {
    Swal.close();
  }

  public question2(
    title: string,
    subTitle: string,
    showConfirmButton: boolean,
    showCancelButton: boolean,
    btnConfirmText: string,
    btnCancelText: string,
    image = 'assets/icons/library.svg'
  ): Promise<any> {
    return new Promise((resolve) => {
      const swalPersonalizado = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-confirmation mr-2',
          cancelButton: 'btn btn-cancel',
          title: 'swal-title',
          htmlContainer: 'swal-html-container',
          image: 'swal-image'
        },
        buttonsStyling: false,
      });

      const swalOptions: SweetAlertOptions = {
        title: title,
        html: `<div class="swal-html-container"><p>${subTitle}</p></div>`,
        imageUrl: image,
        imageAlt: 'Custom image',
        text: '',
        showConfirmButton: showConfirmButton,
        showCloseButton: false,
        showCancelButton: showCancelButton,
        focusConfirm: true,
        confirmButtonText: btnConfirmText,
        cancelButtonText: btnCancelText,
        allowOutsideClick: false,
        allowEscapeKey: false,
        width: 400,
      };

      swalPersonalizado.fire(swalOptions).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          resolve(true);
        } else if (
          result.dismiss === Swal.DismissReason.cancel ||
          result.dismiss === Swal.DismissReason.close
        ) {
          resolve(false);
        }
      });
    });
  }


}
