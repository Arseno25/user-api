<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

/**
 * @OA\Info(title="User API", version="1.0")
 */
class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/users",
     *     summary="Get list of users",
     *     @OA\Response(response="200", description="A list of users")
     * )
     */
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    /**
     * @OA\Post(
     *     path="/users",
     *     summary="Create a new user",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(response="201", description="User created successfully"),
     *     @OA\Response(response="422", description="Validation error")
     * )
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'age' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'age' => $request->age,
        ]);

        return response()->json($user, 201);
    }

    /**
     * @OA\Get(
     *     path="/users/{id}",
     *     summary="Get a user by ID",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response="200", description="User found"),
     *     @OA\Response(response="404", description="User not found")
     * )
     */
    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    /**
     * @OA\Put(
     *     path="/users/{id}",
     *     summary="Update a user",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(response="200", description="User updated successfully"),
     *     @OA\Response(response="422", description="Validation error"),
     *     @OA\Response(response="404", description="User not found")
     * )
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'age' => 'sometimes|required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 422);
        }

        $user->update($request->only(['name', 'email', 'age']));

        return response()->json($user, 200);
    }

    /**
     * @OA\Delete(
     *     path="/users/{id}",
     *     summary="Delete a user",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response="204", description="User deleted successfully"),
     *     @OA\Response(response="404", description="User not found")
     * )
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(null, 204);
    }
}

/**
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="email", type="string", example="john.doe@example.com"),
 *     @OA\Property(property="age", type="integer", example=30)
 * )
 */
