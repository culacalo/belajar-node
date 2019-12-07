const FarhanModel = require('@farhan/models')
const Validate = require('fastest-validator')
const HttpStatus = require('http-status-codes')

class FarhanService{
	constructor(){
		this.farhanModel = new FarhanModel()
		this.validator = new Validate();
		this.schema = {
			name: {
					type: "string",
					min: 3,
			},
			age: {
					type: "number",
					positive: true,
					integer: true,
					optional: true
			}
		};
	}

	async index(query){
    const offset = query.offset || 0;
    const limit = query.limit || 10;
    const maxAge = query.max_age;
    const minAge = query.min_age;
    const search = query.name;
    const sortBy = query.sort_by;
    const order = query.order;
    
    const totalUser = await this.farhanModel.getTotalUser(minAge, maxAge, search)
    const userData = await this.farhanModel.index(
    offset,
    limit, 
    minAge, 
    maxAge,
    search,
    sortBy,
    order
    );

		// return await this.farhanModel.index()
    return {
      data: userData,
      pagination: {
        total_user: totalUser,
        offset,
        limit
      }
    }
  }

	async getByID(id){
		const data = await this.farhanModel.getByID(id)

		if(data.length > 0){
      return data
		}
		return "data kosong"
	}

	async insert(data){
		const farhan = {
      name: data.name,
      age: data.age
		}

		const isFormValid = this.validator.validate(farhan, this.schema)
		if(isFormValid !== true){
			return{
					status: HttpStatus.BAD_REQUEST,
					error: {
							error_code: 'FORM_VALIDATION',
							message: isFormValid
					}
			};
		}

		const isDataValid = await this.dataValidation(farhan)
		if(isDataValid !== true){
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: 'DATA_VALIDATION',
          message: isDataValid
        }
      };
		}

		const userInsert = await this.farhanModel.insert(farhan);

		if(userInsert.affectedRows === 0){
			return {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: {
          error_code: 'INTERNAL_SERVER_ERROR',
          message : 'Internal Server Error'
				}
			}
		}

		return {
			status: HttpStatus.OK,
			data: "data is saved"
		}
	}

	async dataValidation(data){
		const { name } = data
		const userWithName = await this.farhanModel.getUserByName(name);
		if(userWithName.length > 0){
			return [
				{
          type: "string",
          field: "name",
          message: "Name already exist"
				}
			];
		}
		return true;
	}

	async update(userId, userData){
		if(!userId){
      return {
        status: 400,
        message: 'user id required'
      }
		}

		const data = {};
		if(userData.name){
      data.name = userData.name;
		}

		if(userData.age){
      data.age = userData.age
		}

		const updateUser = await this.farhanModel.update(userId, data)
		if(updateUser.affectedRows === 1){
      return {
          status: 200,
          data: 'data updated'
      }
		}

		return {
      status:500,
      message: 'Internal Server Error'
		}
	}

	async delete(userId){
    if(!userId){
      return {
          status: 400,
          message: 'user id required'
      }
    }

    const data = {
      is_deleted: 1
    }

    const deleteUser = await this.farhanModel.update(userId, data);
    if(deleteUser.affectedRows !== 1){
      return {
        status: 500,
        message: 'Internal Server Error'
      }   
    }

    return {
      status: 200,
      data: 'data updated'
    }
	}
}

module.exports = FarhanService;