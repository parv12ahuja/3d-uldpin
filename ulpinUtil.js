import geohash from 'ngeohash';
import crypto from 'crypto';

export function generate3DULPIN(stateCode, districtCode, xAxis, yAxis, zAxis, floor) {
    const state = String(stateCode).toUpperCase().trim().substring(0, 2).padEnd(2, 'X');
    const district = String(districtCode).padStart(2, '0').substring(0, 2);
    const geoStr = geohash.encode(yAxis, xAxis, 6).toUpperCase();
    
    let floorStr = floor >= 0 ? String(floor).padStart(2, '0').substring(0, 2) : String(floor).substring(0, 2);
    
    const rawString = `${stateCode}${districtCode}${xAxis}${yAxis}${zAxis}${floor}`;
    const fullHash = crypto.createHash('sha256').update(rawString).digest('hex').toUpperCase();
    const checksum = fullHash.substring(0, 2);
    
    const ulpin = `${state}${district}${geoStr}${floorStr}${checksum}`;
    if (ulpin.length !== 14) throw new Error(`Length check failed: ${ulpin}`);
    return ulpin;
}