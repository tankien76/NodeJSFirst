const db = require("../models")

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    address: data.address
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'ok',
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: inputId },
                    attributes: ['id', 'name', 'address', 'descriptionHTML', 'descriptionMarkdown', 'image']
                })

                if (data) {

                    let doctorClinic = await db.Doctor_infor.findAll({
                        where: {
                            clinicId: inputId,
                        },
                        attributes: ['doctorId']
                    })
                    data.doctorClinic = doctorClinic
                } else data = {}

                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let handleEditClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.descriptionMarkdown || !data.descriptionHTML || !data.address || !data.image) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let clinic = await db.Clinic.findOne({
                where: { id: data.id },
                raw: false
            })
            if (clinic) {
                clinic.descriptionMarkdown = data.descriptionMarkdown;
                clinic.descriptionHTML = data.descriptionHTML;
                clinic.address = data.address;
                clinic.image = data.image;
                await clinic.save();

                resolve({
                    errCode: 0,
                    message: 'Updated clinic succeeds!'
                })

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Clinic not found!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let handleDeleteClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.Clinic.findOne({
            where: { id: clinicId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                message: `The clinic isn't exist`,
            })
        }

        await db.Clinic.destroy({
            where: { id: clinicId }
        })

        resolve({
            errCode: 0,
            message: 'The clinic is deleted',
        })
    })
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    handleEditClinic: handleEditClinic,
    handleDeleteClinic: handleDeleteClinic
}