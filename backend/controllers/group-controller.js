const db = require('../database')
const Joi = require('joi')

exports.createGroup = async (req, res) => {
    const groupName = req.body.groupName
    const groupDescription = req.body.groupDescription
    const organizationId = req.param('organization')
    const instructorId = req.param('instructor')

    const schema = Joi.object().keys({
        groupName: Joi.string().required(),
        groupDescription: Joi.string()
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }

    await db.conn.promise().query(`
    INSERT INTO group_(GroupName, Description, Instructor_ID, Organization_ID)
    VALUES('${groupName}','${groupDescription}' , '${instructorId}','${organizationId}'
            )
    `).then(data => {
        res.status(200).json({
            msg: " ok created",
            status: "200"
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    })

}

exports.editGroup = async (req, res) => {
    const groupName = req.body.groupName
    const description = req.body.descriptionss
    const groupId = req.param('group')

    const schema = Joi.object().keys({
        groupName: Joi.string().min(3).required(),
        description: Joi.string()
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return res.status('400').send(result.error.details[0].message)
    }

    await db.conn.promise()
        .query(`
        UPDATE group_
        SET GroupName = '${groupName}', Description = '${description}'
        WHERE Group_ID = '${groupId}'
        `)
        .then(data => {
            if (data[0].affectedRows != 0) {
                res.status(200).json({
                    status: "ok",
                    msg: "Updated"
                })
            } else {
                res.status(404).json({
                    msg: "No Question Bank with that ID"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                status: "error",
                msg: "500 Internal Server Error"
            })
        })
}

exports.deleteGroup = async (req, res) => {
    const groupId = req.param('group')
    await db.conn.promise().query(`
        DELETE FROM group_ 
        WHERE Group_ID = '${groupId}'
        `)
        .then(data => {
            if (data[0].affectedRows != 0) {
                res.status(200).json({
                    status: "Ok",
                    msg: "Deleted"
                })
            } else {
                res.status(404).json({
                    status: "error",
                    msg: "No Group with this ID"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({

                status: "error",
                msg: "500 internal server error"
            })
        })
}

exports.listGroups = async (req, res) => {
    const instructorId = req.param('instructor')
    let groups
    let isError = false

    try {
        await db.conn.promise().query(`
    SELECT * FROM group_ 
    WHERE Instructor_ID = ${instructorId}
    `).then(data => {
            groups = data[0]
        }).catch(error => {
            res.status(500).json({
                status: "error",
                msg: "500 internal server error"
            })
        })

        for (let i = 0; i < groups.length; i++) {
            await db.conn.promise().query(`
    SELECT COUNT(examinee_Examinee_ID) as numberOfExaminees FROM examinee_has_group_ 
    WHERE group__Group_ID = ${groups[i].Group_ID}
    `).then(data => {
                console.log(data[0][0])
                Object.assign(groups[i], {
                    numberOfExaminees: data[0][0].numberOfExaminees
                })
            })
        }
    } catch (error) {
        isError = true
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    }

    if (!isError) {
        res.status(200).json({
            groups: groups,
            msg: 'ok'
        })
    }

}

exports.listExamineesInGroup = async (req, res) => {
    const groupId = req.param('group')

    await db.conn.promise().query(`
        SELECT * FROM examinee_has_group_
        JOIN examinee ON examinee_has_group_.examinee_Examinee_ID = examinee.Examinee_ID
        WHERE group__Group_ID = ${groupId}
    `).then(data => {
        res.status(200).json({
            examinees: data[0]
        })
    }).catch(error => {
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    })
}

exports.assignExamineeToGroup = async (req, res) => {
    const examineeId = req.param('examinee')
    const groupId = req.param('group')

    await db.conn.promise().query(`
    INSERT INTO examinee_has_group_(examinee_Examinee_ID, group__Group_ID)
    VALUES('${examineeId}','${groupId}')
    `).then(data => {
        res.status(200).json({
            msg: " ok assigned",
            status: "200"
        })
    }).catch(error => {
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    })

}

exports.assignExamToGroup = async (req, res) => {
    const examId = req.param('exam')
    const groupId = req.param('group')

    await db.conn.promise().query(`
    INSERT INTO exam_has_group_(exam_Exam_ID, group__Group_ID)
    VALUES('${examId}','${groupId}')
    `).then(data => {
        res.status(200).json({
            msg: " ok assigned",
            status: "200"
        })
    }).catch(error => {
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    })
}

// exports.unassignExamToGroup = async (req, res) => {
//     const examId = req.param('exam')
//     const groupId = req.param('group')

//     await db.conn.promise().query(`
//     DELETE FROM exam_has_group_
//     WHERE exam_Exam_ID = ${examId} AND group__Group_ID = ${groupId}
//     `).then(data => {
//             if (data[0].affectedRows != 0) {
//                 res.status(200).json({
//                     status: "Ok",
//                     msg: "unassigned"
//                 })
//             } else {
//                 res.status(404).json({
//                     status: "error",
//                     msg: "No Group or Exam with this ID"
//                 })
//             }
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({
//                 status: "error",
//                 msg: "500 internal server error"
//             })
//         })
// }

exports.removeExamFromGroup = async (req, res) => {
    const examId = req.param('exam')
    const groupId = req.param('group')

    await db.conn.promise().query(`
    DELETE FROM exam_has_group_
    WHERE exam_Exam_ID = ${examId} AND group__Group_ID = ${groupId}
    `).then(data => {
            if (data[0].affectedRows != 0) {
                res.status(200).json({
                    status: "Ok",
                    msg: "Deleted"
                })
            } else {
                res.status(404).json({
                    status: "error",
                    msg: "No Exam or Group with this ID"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({

                status: "error",
                msg: "500 internal server error"
            })
        })
}

exports.removeExamineeFromGroup = async (req, res) => {
    const examineeId = req.param('examinee')
    const groupId = req.param('group')

    await db.conn.promise().query(`
    DELETE FROM examinee_has_group_ WHERE examinee_Examinee_ID =${examineeId} 
        AND group__Group_ID = ${groupId}
    `).then(data => {
            if (data[0].affectedRows != 0) {
                res.status(200).json({
                    status: "Ok",
                    msg: "Deleted"
                })
            } else {
                res.status(404).json({
                    status: "error",
                    msg: "No Group or Examinee with this ID"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                status: "error",
                msg: "500 internal server error"
            })
        })
}

exports.listExamineesInOrganization = async (req, res) => {
    const organizationId = req.param('organization')

    await db.conn.promise().query(`
    SELECT * FROM examinee
    WHERE Organization_ID = '${organizationId}'
    `).then(data => {
        res.status(200).json({
            examinees: data[0]
        })
    }).catch(error => {
        res.status(500).json({
            status: "error",
            msg: "500 internal server error"
        })
    })
}