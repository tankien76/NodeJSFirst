import doctorService from '../service/doctorService'

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) {
        limit = 10;
    }
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ...'
        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctor()
        return res.status(200).json(doctors)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from the server'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveInforDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from the server'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let info = await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from the server'
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from the server'
        })
    }
}

let getScheduleDoctor = async (req, res) => {
    try {
        let infor = await doctorService.getScheduleDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from the server'
        })
    }
}

let getExtraInforById = async (req, res) => {
    try {
        let infor = await doctorService.getExtraInforById(req.query.doctorId);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from the server'
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from the server'
        })
    }
}

let getListPatient = async (req, res) => {
    try {
        let infor = await doctorService.getListPatient(req.query.doctorId, req.query.date);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from the server'
        })
    }
}

let sendRemedy = async (req, res) => {
    try {
        let infor = await doctorService.sendRemedy(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from the server'
        })
    }
}

let getAllDoctorSearch = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctorSearch()
        return res.status(200).json(doctors)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMesage: 'Error from the server'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctor: getScheduleDoctor,
    getExtraInforById: getExtraInforById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatient: getListPatient,
    sendRemedy: sendRemedy,
    getAllDoctorSearch: getAllDoctorSearch
}