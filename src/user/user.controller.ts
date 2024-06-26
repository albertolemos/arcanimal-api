import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/decorators/get-user-id.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@ApiOperation({ summary: 'Retrieve all users with optional pagination' })
	@ApiQuery({ name: 'page', required: false, type: 'number' })
	@ApiResponse({ status: 200, description: 'Returned all users successfully along with total count.' })
	async findAll(@Query('page') page?: number) {
		const usersAndTotal = await this.userService.findAll(page, Number(process.env.PAGE_LIMIT));
		return {
			data: usersAndTotal.data,
			total: usersAndTotal.total
		};
	}

	@Get('role')
	@ApiOperation({ summary: 'Retrieve users by role with optional pagination' })
	@ApiQuery({ name: 'role', required: true })
	@ApiQuery({ name: 'page', required: false, type: 'number' })
	@ApiResponse({ status: 200, description: 'Returned users with specified role along with total count.' })
	async findByRole(@Query('role') role: Role, @Query('page') page?: number) {
		const usersAndTotal = await this.userService.findAllWithRole(role, page, Number(process.env.PAGE_LIMIT) );
		return {
			data: usersAndTotal.data,
			total: usersAndTotal.total
		};
	}

	@ApiBearerAuth('BearerAuth')
	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
	@ApiOperation({ summary: 'Update a user by id' })
	@ApiResponse({ status: 200, description: 'User updated successfully.' })
	async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @GetUserId() userId: number) {
		return this.userService.update(id, updateUserDto, userId);
	}

	@ApiBearerAuth('BearerAuth')
	@UseGuards(AuthGuard('jwt'))
	@Delete(':id')
	@ApiOperation({ summary: 'Delete a user by id' })
	@ApiResponse({ status: 200, description: 'User deleted successfully.' })
	async remove(@Param('id') id: number) {
		return this.userService.remove(id);
	}
	
	@ApiBearerAuth('BearerAuth')
	@UseGuards(AuthGuard('jwt'))
	@Post('volunteer')
	@ApiOperation({ summary: 'Create a new volunteer' })
	@ApiResponse({ status: 201, description: 'Volunteer created successfully.' })
	async createVolunteer(@Body() createUserDto: CreateUserDto, @GetUserId() userId: number) {
		return this.userService.createVolunteer(createUserDto, userId);
	}

	@ApiBearerAuth('BearerAuth')
	@UseGuards(AuthGuard('jwt'))
	@Post('admin')
	@ApiOperation({ summary: 'Create a new admin' })
	@ApiResponse({ status: 201, description: 'Admin created successfully.' })
	async createAdmin(@Body() createUserDto: CreateUserDto, @GetUserId() userId: number) {
		return this.userService.createAdmin(createUserDto, userId);
	}

	@Post('reset-password')
	@ApiOperation({ summary: 'Reset password' })
	@ApiQuery({ name: 'email', required: true, type: 'string' })
	async resetPassword(@Query('email') email: string) {
		return await this.userService.resetUserPassword(email);
	}
 
}
