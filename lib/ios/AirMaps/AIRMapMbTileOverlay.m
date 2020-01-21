//
//  AIRMapMbTileOverlay.m
//  Pods-AirMapsExplorer
//
//  Created by Christoph Lambio on 28/03/2018
//  Based on AIRMapLocalTileOverlay.m
//  Copyright (c) by Peter Zavadsky.
//

#import "AIRMapMbTileOverlay.h"
#import "FMDatabase.h"

@interface AIRMapMbTileOverlay ()

@end

@implementation AIRMapMbTileOverlay


-(void)loadTileAtPath:(MKTileOverlayPath)path result:(void (^)(NSData *, NSError *))result {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if ([fileManager fileExistsAtPath:self.URLTemplate]) {
        FMDatabase *offlineDataDatabase = [FMDatabase databaseWithPath:self.URLTemplate];
        [offlineDataDatabase open];
        NSMutableString *query = [NSMutableString stringWithString: @"SELECT tile_data FROM tiles WHERE zoom_level = {z} AND tile_column = {x} AND tile_row = {y};"];
        [query replaceCharactersInRange: [query rangeOfString: @"{z}"] withString:[NSString stringWithFormat:@"%li", path.z]];
        [query replaceCharactersInRange: [query rangeOfString: @"{x}"] withString:[NSString stringWithFormat:@"%li", path.x]];
        [query replaceCharactersInRange: [query rangeOfString: @"{y}"] withString:[NSString stringWithFormat:@"%li", path.y]];
        FMResultSet *databaseResult = [offlineDataDatabase executeQuery:query];
        if ([databaseResult next]) {
            NSData *tile = [databaseResult dataForColumn:@"tile_data"];
            [offlineDataDatabase close];
            result(tile,nil);
        } else {
            [offlineDataDatabase close];
            result(nil,nil);
        }
    } else {
        NSLog(@"Database not found. Wrong path.");
    }
}


@end

