import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  birth: Date;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  carrier: string;

  @Column()
  certified: boolean;

  @Column({ type: 'timestamp' })
  certified_at: Date;

  @Column()
  foreigner: boolean;

  @Column()
  foreigner_v2: boolean;

  @Column()
  gender: string;

  @Column()
  imp_uid: string;

  @Column()
  merchant_uid: string;

  @Column()
  name: string;

  @Column()
  origin: string;

  @Column()
  pg_provider: string;

  @Column()
  pg_tid: string;

  @Column()
  phone: string;

  @Column({ type: 'text' })
  unique_in_site: string;

  @Column({ type: 'text' })
  unique_key: string;
}
