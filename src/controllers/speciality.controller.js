import { addClass, addSpeciality, getActiveClasses, getAllClasses, getAllClassesForUser, getAllPayments, getAllTrainers, getAllUsers, getClassDetails, getClasses, getdaySchedule, getMySubscriptions, getNextClass, getPartnersByClass, getPaymentByMonth, getPaymentByUser, getRates, getSchedule, getSpeciality, getStudentsByTrainer, getTotalIncome, getTotalUsersAndTrainers, getTypeSubscriptions, updateAllClasses, updateAttendance, updateClass, updateRate, updateUser } from "../services/speciality.service.js"

export const getClassesController = async (req, res) => {
  try {
    
    const instructorId = req.params.id

    const response = await getClasses(instructorId)

    return res.status(200).json(response)

  } catch (error) {
    
  }
}

export const getClassDetailsController = async (req, res) => {
  try {
    
    const classId = req.params.id

    const response = await getClassDetails(classId)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getScheduleController = async (req, res) => {
  try {
    
    const instructorId = req.params.id

    const response = await getSchedule(instructorId)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getdayScheduleController = async (req, res) => {
  try {
    
    const instructorId = req.params.id

    const response = await getdaySchedule(instructorId)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getTotalUsersAndTrainersController = async (req, res) => {
  try {
    
    const response = await getTotalUsersAndTrainers()

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getActiveClassesController = async (req, res) => {
  try {
    
    const response = await getActiveClasses()

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getTotalIncomeController = async (req, res) => {
  try {
    
    const response = await getTotalIncome()

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAllUsersController = async (req, res) => {
  try {
    
    const response = await getAllUsers()

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAllTrainersController = async (req, res) => {
  try {
    
    const response = await getAllTrainers()

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAllClassesController = async (req, res) => {
  try {
    
    const response = await getAllClasses()

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getRatesController = async (req, res) => {
  try {
    
    const response = await getRates()

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAllPaymentsController = async (req, res) => {
  try {
    
    const response = await getAllPayments()

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPaymentByMonthController = async (req, res) => {
  try {
    
    const response = await getPaymentByMonth()

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getTypeSubscriptionsController = async (req, res) => {
  try {
    
    const {id} = req.params

    const response = await getTypeSubscriptions(id)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAllClassesForUserController = async (req, res) => {
  try {
    
    const response = await getAllClassesForUser()

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getMySubscriptionsController = async (req, res) => {
  try {
    
    const {id} = req.params

    const response = await getMySubscriptions(id)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPaymentByUserController = async (req, res) => {
  try {
    
    const {id} = req.params

    const response = await getPaymentByUser(id)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateUserController = async (req, res) => {
  try {
    
    const {id} = req.params
    const {nombre, email, telefono, direccion} = req.body

    const response = await updateUser(id, nombre, email, telefono, direccion)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

// EN PROCESO
export const updateClassController = async (req, res) => {
  try {
    
    const {id} = req.params
    const {title, description, hora_inicio, hora_fin} = req.body

    const response = await updateClass(id, title, description, hora_inicio, hora_fin)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getSpecialityController = async (req, res) => {
  try {
    
    const response = await getSpeciality()

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addSpecialityController = async (req, res) => {
  try {
    
    const {nombre, descripcion} = req.body

    const response = await addSpeciality(nombre, descripcion)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateRateController = async (req, res) => {
  try {
    
    const {id} = req.params
    const {precio} = req.body

    const response = await updateRate(id, precio)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateAllClassesController = async (req, res) => {
  try {

    const {id} = req.params
    const {especialidad, titulo, entrenador} = req.body
    
    const response = await updateAllClasses(id, especialidad, titulo, entrenador)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateAttendanceController = async (req, res) => {
  try {
    
    const {id} = req.params
    const {estado} = req.body

    const response = await updateAttendance(id, estado)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getStudentsByTrainerController = async (req, res) => {
  try {

    const {id} = req.params
    
    const response = await getStudentsByTrainer(id)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getNextClassController = async (req, res) => {
  try {
    
    const {id} = req.params

    const response = await getNextClass(id)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPartnersByClassController = async (req, res) => {
  try {
    
    const {id} = req.params

    const response = await getPartnersByClass(id)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addClassController = async (req, res) => {
  try {
    
    const {especialidad, titulo, descripcion, entrenador, inicio, fin, capacidad} = req.body

    const response = await addClass(especialidad, titulo, descripcion, entrenador, inicio, fin, capacidad)

    return res.status(200).json(response)

  } catch (error) {
    console.log(error)
    throw error
  }
}