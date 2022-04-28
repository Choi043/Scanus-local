import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QRRepository } from "src/domains/qr-master/domain/qr.repository";
import { QRDetailRepository } from "../domain/qr-detail.repository";
import { QRDetailRegisterDto } from "./dto/qr-detail.register";

@Injectable()
export class QRDetailColumnCreateService {
    constructor(
        @InjectRepository(QRDetailRepository)
        private readonly qrDetailRepository: QRDetailRepository,
    ) { }

    // 기능 구현  unique_cd,  access_key,  furl,  secure_cd  
    async dataGroup(qrDetailValues: QRDetailRegisterDto) {
        const { cmpny_cd } = qrDetailValues;
        const inputAccess = this.secureCode('else', Math.floor(Math.random() * 5) + 50);
        const uniqueCode = await this.uniqueCode(cmpny_cd);
        const accesskey_cd = this.accesskeyCode(uniqueCode, inputAccess);
        const full_url = this.fullUrl(cmpny_cd, accesskey_cd);
        const secureCode = this.secureCode('num', 6);

        return {
            secureCode, uniqueCode, accesskey_cd, full_url
        }
    }

    public async uniqueCode(cmpny_cd: string) {
        const count = await this.qrDetailRepository.count({
            where: {
                cmpny_cd
            }
        })
        const unique_cd = cmpny_cd + String(Math.pow(10, 8) + count + 1);

        return unique_cd;
    }

    public accesskeyCode(
        unique_cd: string,
        secure_cd: string
    ) {
        const access_key = `${unique_cd}-` + secure_cd; 

        return access_key;
    }

    public fullUrl(
        companyCode: string,
        accessKey: string,
    ) {
        const cmpny_cd = companyCode.toLowerCase()


        let furl = `https://${cmpny_cd}.blockodyssey.io/scan?key=` + accessKey;

        return furl;
    }

    public secureCode(type: string, length: number) {
        let ALPHA = [];
        if (type == 'en') {
            ALPHA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        } else if (type == 'num') {
            ALPHA = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        } else {
            ALPHA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        }
        let randomCode = '';
        for (let i = 0; i < length; i++) {
            var randTnum = Math.floor(Math.random() * ALPHA.length);
            randomCode += ALPHA[randTnum];
        }
        return randomCode;
    }

}