import { Scratch_type } from "src/commons/enumLIst/scratch_type";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AccessKey_upload } from "./accesskey.upload";
import { QR_upload } from "./qr-detail.upload";

@Entity('tb_qr_detail')
@Unique(['access_key'])
export class QRDetailEntity {
    @PrimaryGeneratedColumn({ comment: "QR 디테일IDX" })
    qr_detail_idx: number;

    @Column("int", { comment: "QR IDX" })
    qr_idx: number;

    @Column("varchar", { length: 3, comment: "회사코드(3자리)" })
    cmpny_cd: string;

    @Column("varchar", { length: 15, nullable: true, comment: "유니크코드" })
    unique_cd: string;

    @Column("varchar", { length: 10, nullable: true, comment: "QR 단위 (item:개별, box:박스단위)" })
    unit: string;

    @Column("varchar", { length: 250, nullable: true, comment: "QR 데이터 (full-URL) - encoded_key" })
    furl: string;

    @Column("varchar", { length: 250, nullable: true, comment: "QR 데이터 (shorten-URL) - surl_key" })
    surl: string;

    @Column("varchar", { length: 250, nullable: true, comment: "QR 코드키" })
    access_key: string;

    @Column({
        type: 'enum',
        enum: ['Y', 'N'],
        name: 'scratch_type',
        comment: '_스크래치 (Y:사용, N:미사용)'
    })
    scratch_type: Scratch_type

    @Column("varchar", { length: 10, nullable: true, comment: "Secure 코드" })
    secure_cd: string;

    @Column({
        type: 'enum',
        enum: QR_upload,
        default: QR_upload.FAIL,
        comment: 'productObject 업로드상태 (Y:성공, N:실패) '
    })
    upload_yn: QR_upload

    @Column('datetime', { nullable: true, comment: 'accessKey 업로드상태(Y:성공, N:실패) ' })
    upload_dt: Date;

    @Column({
        type: 'enum',
        enum: AccessKey_upload,
        default: AccessKey_upload.FAIL,
        comment: 'accessKey 업로드상태(Y:성공, N:실패) '
    })
    upload_yn_access_key: AccessKey_upload

    @Column('datetime', { nullable: true, comment: 'accessKey 업로드일시' })
    upload_dt_access_key: Date;

    @Column('varchar', { length: 50, nullable: true, comment: 'item일괄 생성 후 완료되면 BOX 단위에 매칭할 ProductObject full address 가져오기 위한값. core 전용 필드' })
    po_full_addr: string;

    @Column('varchar', { default: () => 'current_timestamp',  comment: '등록일시' })
    reg_dt: Date;
}