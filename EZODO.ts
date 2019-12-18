/**
* Makecode extension for Dissolved Oxygen Sensor
*/

namespace SGBotic{
    
    let I2C_ADDR = 97  //0x61
   
    export enum respond{   
        No_Data = 255,
        Processing = 254,
        Error = 2,
        OK = 1
    }
    
    
    /**
     * Read Dissolved oxygen
     */
    //% subcategory=Dissolved-Oxygen
    //% blockId="read_do" block="Dissolved Oxygen I2C Addr %i2c_addr"
    //% weight=100 blockGap=10 
    //% i2c_addr.defl=97
    export function read_do(i2c_addr: number): number {
        let writeBuf: Buffer = pins.createBuffer(1);
        let readBuf: Buffer = pins.createBuffer(20);
        
        let i = 0
        
        writeBuf[0] = 82 //ASCII of 'R', request single reading
        //pins.i2cWriteBuffer(I2C_ADDR, writeBuf)
        pins.i2cWriteNumber(I2C_ADDR, 82, NumberFormat.UInt8BE, false)
        basic.pause(600)  //processing delay
        
        readBuf = pins.i2cReadBuffer(I2C_ADDR, 20, false);
   
        if (readBuf[0] === respond.OK)
        {
            i = 1;
            //determine the size of data string
            while(readBuf[i] != 46) //look for ASCII '.'
            {
                i = i + 1;
            }
        
            let result: number = 0
        
            //convert ASCII to integer
            if (i == 2)
            {   
                //x.xx 
                result = ((readBuf[1] - 48) * 100) + ((readBuf[3] - 48) * 10) + (readBuf[4] - 48)
            }else if (i == 3)
            {
                //xx.xx 
                result = ((readBuf[1] - 48) * 1000) + ((readBuf[2] - 48) * 100) + ((readBuf[4] - 48) * 10) + readBuf[5]
        
            }
        
            return result
        }else
            return 0
    }
    
    
    /**
     * Basic Calibration
     */
    //% subcategory=Dissolved-Oxygen
    //% blockId="basicCal" block="Basic Calibration %i2c_addr"
    //% weight=90 blockGap=10
    //% i2c_addr.defl=97
    export function basicCal(i2c_addr: number): number {
        let writeBuf: Buffer = pins.createBuffer(3);
        let readBuf: Buffer = pins.createBuffer(2);
        
        let i = 0
        
        writeBuf[0] = 67 //ASCII of 'C', request single reading
        writeBuf[1] = 97 //ASCII of 'a'
        writeBuf[2] = 108 //ASCII of 'l'
        
        pins.i2cWriteBuffer(I2C_ADDR, writeBuf)
        
        basic.pause(1500)  //processing delay
        
        readBuf = pins.i2cReadBuffer(I2C_ADDR, 2, false);
   
        return readBuf[0]
    }
    
    /**
     * Calibrate to Zero DO
     */
    //% subcategory=Dissolved-Oxygen
    //% blockId="calToZero" block="Calibrate to Zero DO %i2c_addr"
    //% weight=80 blockGap=10 
    //% i2c_addr.defl=97
    export function calToZero(i2c_addr: number): number {
        let writeBuf: Buffer = pins.createBuffer(5);
        let readBuf: Buffer = pins.createBuffer(2);
        
        let i = 0
        
        writeBuf[0] = 67 //ASCII of 'C'
        writeBuf[1] = 97 //ASCII of 'a'
        writeBuf[2] = 108 //ASCII of 'l'
        writeBuf[3] = 44 //ASCII of ','
        writeBuf[4] = 48 //ASCII of '0'
        
        pins.i2cWriteBuffer(I2C_ADDR, writeBuf)
        
        basic.pause(1500)  //processing delay
        
        readBuf = pins.i2cReadBuffer(I2C_ADDR, 2, false);
   
        return readBuf[0]
    }
    
    /**
     * Delete Calibration Data
     */
    //% subcategory=Dissolved-Oxygen
    //% blockId="calDelete" block="Delete calibration data %i2c_addr"
    //% weight=80 blockGap=10 
    //% i2c_addr.defl=97
    export function calDelete(i2c_addr: number): number {
        let writeBuf: Buffer = pins.createBuffer(9);
        let readBuf: Buffer = pins.createBuffer(2);
        
        let i = 0
        
        writeBuf[0] = 67 //ASCII of 'C'
        writeBuf[1] = 97 //ASCII of 'a'
        writeBuf[2] = 108 //ASCII of 'l'
        writeBuf[3] = 44 //ASCII of ','
        writeBuf[4] = 99 //ASCII of 'c'
        writeBuf[5] = 108 //ASCII of 'l'
        writeBuf[6] = 101 //ASCII of 'e'
        writeBuf[7] = 97 //ASCII of 'a'
        writeBuf[8] = 114 //ASCII of 'r'
        
        pins.i2cWriteBuffer(I2C_ADDR, writeBuf)
        
        basic.pause(500)  //processing delay
        
        readBuf = pins.i2cReadBuffer(I2C_ADDR, 2, false);
   
        return readBuf[0]
    }
    
    
}