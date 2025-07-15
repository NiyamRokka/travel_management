import * as jwt from 'jsonwebtoken'
import { Ipayload } from '../types/global.types'

const JWT_SECRET:jwt.Secret = process.env.JWT_SECRET || 'abc.defg.hijk.lmno.pqrst.uvw.xyz.alphabets.1234890.0987654321.!@#$%^&*().()*&^%$@Q!'
const JWT_EXP = process.env.JWT_EXP || '1d'

export const generateToken = (payload:Ipayload) =>  {
    return jwt.sign(payload,JWT_SECRET,{
        expiresIn:JWT_EXP as any,
    })
}









